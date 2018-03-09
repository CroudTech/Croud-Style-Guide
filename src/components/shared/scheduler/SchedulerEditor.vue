<template>
    <div class="ui segment basic">
        <div class="ui equal width internally celled grid">
            <div class="column">
                <div class="ui form">
                    <div class="grouped fields">
                        <div class="field ui mini buttons">
                            <button class="ui button mini" @click="setAllWorking()">Work Days</button>
                            <button class="ui button mini" @click="setAll()">Every Day</button>
                            <button class="ui button mini" @click="clearAll()">Clear</button>
                        </div>
                    </div>
                    <div class="grouped fields">
                        <div class="field" v-for="(day, key) in schedule.frequency.days" :key="key">
                            <div class="ui toggle checkbox">
                                <input type="checkbox" value="1" v-model="schedule.frequency.days[key]">
                                <label>{{ key | capitalise }}</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ui divider"/>
                <div class="ui form">
                    <div class="grouped fields">
                        <div class="field">
                            <semantic-form-dropdown v-model="schedule.frequency.recur" :options="periodOptions"></semantic-form-dropdown>
                        </div>
                    </div>
                </div>
            </div>

            <div class="column">
                <div class="ui form">
                    <div class="grouped fields">
                        <div class="field ui mini buttons">
                            <button class="ui button mini" @click="setAllMonths(true)">Every</button>
                            <button class="ui button mini" @click="setAlternateMonths()">Alternative</button>
                            <button class="ui button mini" @click="setAllMonths(false)">Clear</button>
                        </div>

                        <div class="field" v-for="(month, key) in schedule.frequency.months" :key="key">
                            <div class="ui toggle checkbox">
                                <input type="checkbox" value="1" v-model="schedule.frequency.months[key]">
                                <label>{{ key | capitalise }}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="column">
                <div class="ui form">
                    <div class="grouped fields">
                        <div class="field">
                            <label>Starts at</label>
                            <croud-datepicker ref="startDate" placeholder="Select start date.." :date="schedule.limit.startsAt" v-on:date-selected="setStartDate"></croud-datepicker>
                        </div>

                        <div class="field">
                            <label>Ends at</label>
                            <croud-datepicker ref="endDate" placeholder="Select end date.." :date="getEndDate" v-on:date-selected="setEndDate" :minDate="getStartDate"></croud-datepicker>
                        </div>
                        <button class="ui mini button" @click="clearEndDate">Clear End Date</button>
                    </div>

                    <div class="field">
                        <label>Time this schedule runs at</label>
                        <semantic-form-dropdown v-model="schedule.frequency.at" :options="timeOptions"></semantic-form-dropdown>
                        <div class="ui light" style="margin-top:5px">
                            (Timezone: <strong>{{ schedule.timezone }}</strong>)
                        </div>
                    </div>

                    <div class="field">
                        <label>Maximum number of times to run</label>
                        <input type="number" v-model="schedule.limit.maxExecutions">
                    </div>

                    <div class="ui divider"></div>

                    <div class="field">
                        <button @click="done" class="ui blue fluid button">
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { defaultsDeep, cloneDeep } from 'lodash'
    import moment from 'moment-timezone'

    import scheduleMixin from '../mixins/schedule'
    import CroudDatepicker from '../forms/DatePicker'

    /**
    * Our scheduler editor
    *
    * @example ./croud-scheduler-editor.md
    */

    export default {
        name: 'croud-scheduler-editor',

        mixins: [scheduleMixin],

        props: {
            /**
             * Root object to contain scheulder schema
             *
            */
            rootObject: {
                type: Object,
                required: true,
            },
        },

        components: {
            CroudDatepicker,
        },

        filters: {
            capitalise: string => string.charAt(0).toUpperCase() + string.slice(1),
        },

        data() {
            return {
                alternating_start: 0,
            }
        },

        computed: {
            getSchedulerObject() {
                const schedule = cloneDeep(this.schedule)
                const days = Object.keys(schedule.frequency.days).filter(day => schedule.frequency.days[day])
                const months = Object.keys(schedule.frequency.months).filter(month => schedule.frequency.months[month])

                const frequency = {
                    recur: schedule.frequency.recur,
                    at: schedule.frequency.at = [schedule.frequency.at],
                    timezone: schedule.frequency.timezone,
                }

                frequency.months = months.length ? months : null
                frequency.days = days.length ? days : null

                const schedulerObject = {
                    [this.keys.frequency]: frequency,
                }

                schedulerObject[this.keys.startsAt] = schedule.limit.startsAt ? moment(schedule.limit.startsAt).format('YYYY-MM-DD hh:mm:ss') : null
                schedulerObject[this.keys.endsAt] = schedule.limit.endsAt ? moment(schedule.limit.endsAt).format('YYYY-MM-DD hh:mm:ss') : null
                schedulerObject[this.keys.maxExecutions] = schedule.limit.maxExecutions > 0 ? parseInt(schedule.limit.maxExecutions, 10) : null

                return { ...this.rootObject, ...schedulerObject }
            },

            periodOptions() {
                return Object.keys(this.periods).map(key => ({
                    id: key,
                    name: this.periods[key],
                }))
            },

            timeOptions() {
                const pad = function (value) {
                    return value < 10 ? `0${value}` : value
                }
                let value
                const arr = []
                for (let i = 0; i < 24; i += 1) {
                    for (let t = 0; t < 60; t += 5) {
                        value = `${pad(i)}:${pad(t)}`
                        arr.push({
                            id: value,
                            name: value,
                        })
                    }
                }
                arr.push({
                    id: '23:59',
                    name: '23:59',
                })
                return arr
            },

            getStartDate() {
                return this.schedule.limit.startsAt ? moment(this.schedule.limit.startsAt).toDate() : null
            },

            getEndDate() {
                return this.schedule.limit.endsAt ? moment(this.schedule.limit.endsAt) : null
            },
        },

        methods: {
            setStartDate(option) {
                this.schedule.limit.startsAt = option.format('YYYY-MM-DD hh:mm:ss')
            },

            setEndDate(option) {
                this.schedule.limit.endsAt = option.format('YYYY-MM-DD hh:mm:ss')
            },

            setAllMonths(option = true) {
                let month
                const months = {}
                for (let i = 0; i < 12; i += 1) {
                    month = moment().month(i)
                    months[month.format('MMMM').toLowerCase()] = option
                }

                this.schedule.frequency.months = months
            },

            setAlternateMonths() {
                this.alternating_start = this.alternating_start === 1 ? 0 : 1
                const index = this.alternating_start % 2 ? 1 : 0

                moment.months().forEach((month, i) => {
                    this.schedule.frequency.months[moment().month(i).format('MMMM').toLowerCase()] = i % 2 === index
                })
            },

            setAllWorking() {
                this.schedule.frequency = defaultsDeep({
                    days: {
                        sunday: false,
                        monday: true,
                        tuesday: true,
                        wednesday: true,
                        thursday: true,
                        friday: true,
                        saturday: false,
                    },
                }, this.schedule.frequency)
            },

            setAll() {
                this.setAllWorking()
                this.$nextTick(() => {
                    this.schedule.frequency = defaultsDeep({
                        days: {
                            sunday: true,
                            monday: true,
                            tuesday: true,
                            wednesday: true,
                            thursday: true,
                            friday: true,
                            saturday: true,
                        },
                    }, this.schedule.frequency)
                })
            },

            clearAll() {
                this.setAllWorking()
                this.$nextTick(() => {
                    this.schedule.frequency = defaultsDeep({
                        days: {
                            sunday: false,
                            monday: false,
                            tuesday: false,
                            wednesday: false,
                            thursday: false,
                            friday: false,
                            saturday: false,
                        },
                    }, this.schedule.frequency)
                })
            },

            clearEndDate() {
                this.$refs.endDate.picker.setDate(null)
                this.schedule.limit.endsAt = ''
            },

            done() {
                this.$emit('schedule-set', this.getSchedulerObject)
                this.$nextTick(this.getSchedule())
            },
        },

        mounted() {
            this.getSchedule()
            this.$watch('getStartDate', this.$refs.endDate.create)
            this.$nextTick(() => {
                $(this.$el).children('.ui.checkbox').checkbox()
                this.$refs.endDate.picker.setMoment(this.getEndDate)
            })
        },

        watch: {
            rootObject: 'getSchedule',
        },
    }
</script>
