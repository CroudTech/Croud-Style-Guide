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
                        <div class="field">
                            <div class="ui toggle checkbox">
                                <input type="checkbox" value="1" v-model="schedule.frequency.days.sunday">
                                <label>Sunday</label>
                            </div>
                        </div>

                        <div class="field">
                            <div class="ui toggle checkbox">
                                <input type="checkbox" value="1" v-model="schedule.frequency.days.monday">
                                <label>Monday</label>
                            </div>
                        </div>

                        <div class="field">
                            <div class="ui toggle checkbox">
                                <input type="checkbox" value="1" v-model="schedule.frequency.days.tuesday">
                                <label>Tuesday</label>
                            </div>
                        </div>

                        <div class="field">
                            <div class="ui toggle checkbox">
                                <input type="checkbox" value="1" v-model="schedule.frequency.days.wednesday">
                                <label>Wednesday</label>
                            </div>
                        </div>

                        <div class="field">
                            <div class="ui toggle checkbox">
                                <input type="checkbox" value="1" v-model="schedule.frequency.days.thursday">
                                <label>Thursday</label>
                            </div>
                        </div>

                        <div class="field">
                            <div class="ui toggle checkbox">
                                <input type="checkbox" value="1" v-model="schedule.frequency.days.friday">
                                <label>Friday</label>
                            </div>
                        </div>

                        <div class="field">
                            <div class="ui toggle checkbox">
                                <input type="checkbox" value="1" v-model="schedule.frequency.days.saturday">
                                <label>Saturday</label>
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

                        <div class="field">
                            <div class="ui toggle checkbox">
                                <input type="checkbox" value="1" v-model="schedule.frequency.months.january">
                                <label>January</label>
                            </div>
                        </div>

                        <div class="field">
                            <div class="ui toggle checkbox">
                                <input type="checkbox" value="1" v-model="schedule.frequency.months.february">
                                <label>February</label>
                            </div>
                        </div>

                        <div class="field">
                            <div class="ui toggle checkbox">
                                <input type="checkbox" value="1" v-model="schedule.frequency.months.march">
                                <label>March</label>
                            </div>
                        </div>

                        <div class="field">
                            <div class="ui toggle checkbox">
                                <input type="checkbox" value="1" v-model="schedule.frequency.months.april">
                                <label>April</label>
                            </div>
                        </div>

                        <div class="field">
                            <div class="ui toggle checkbox">
                                <input type="checkbox" value="1" v-model="schedule.frequency.months.may">
                                <label>May</label>
                            </div>
                        </div>

                        <div class="field">
                            <div class="ui toggle checkbox">
                                <input type="checkbox" value="1" v-model="schedule.frequency.months.june">
                                <label>June</label>
                            </div>
                        </div>

                        <div class="field">
                            <div class="ui toggle checkbox">
                                <input type="checkbox" value="1" v-model="schedule.frequency.months.july">
                                <label>July</label>
                            </div>
                        </div>

                        <div class="field">
                            <div class="ui toggle checkbox">
                                <input type="checkbox" value="1" v-model="schedule.frequency.months.august">
                                <label>August</label>
                            </div>
                        </div>

                        <div class="field">
                            <div class="ui toggle checkbox">
                                <input type="checkbox" value="1" v-model="schedule.frequency.months.september">
                                <label>September</label>
                            </div>
                        </div>

                        <div class="field">
                            <div class="ui toggle checkbox">
                                <input type="checkbox" value="1" v-model="schedule.frequency.months.october">
                                <label>October</label>
                            </div>
                        </div>

                        <div class="field">
                            <div class="ui toggle checkbox">
                                <input type="checkbox" value="1" v-model="schedule.frequency.months.november">
                                <label>November</label>
                            </div>
                        </div>

                        <div class="field">
                            <div class="ui toggle checkbox">
                                <input type="checkbox" value="1" v-model="schedule.frequency.months.december">
                                <label>December</label>
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

    import CroudDatepicker from '../forms/DatePicker'

    /**
    * Our scheduler editor
    *
    * @example ./croud-scheduler-editor.md
    */

    export default {
        name: 'croud-scheduler-editor',

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

        data() {
            return {
                alternating_start: 0,
                periods: {
                    daily: 'Daily on above days',
                    everyFortnight: 'Every alternating week',
                    firstWeekOfMonth: 'The first week only',
                    secondWeekOfMonth: 'The second week only',
                    thirdWeekOfMonth: 'The third week only',
                    fourthWeekOfMonth: 'The fourth week only',
                },
                schedule: {
                    frequency: {
                        months: {
                            january: false,
                            february: false,
                            march: false,
                            april: false,
                            may: false,
                            june: false,
                            july: false,
                            august: false,
                            september: false,
                            october: false,
                            november: false,
                            december: false,
                        },
                        days: {
                            monday: false,
                            tuesday: false,
                            wednesday: false,
                            thursday: false,
                            friday: false,
                            saturday: false,
                            sunday: false,
                        },
                        recur: 'daily',
                        at: '00:00',
                        timezone: moment.tz.guess(),
                    },
                    limit: {
                        startsAt: moment().format('YYYY-MM-DD hh:mm:ss'),
                        endsAt: null,
                        maxExecutions: null,
                    },
                },
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
                    'service=scheduler;table=timetables;field=frequency;': frequency,
                }

                schedulerObject['service=scheduler;table=timetables;field=starts_at;'] = schedule.limit.startsAt ? moment(schedule.limit.startsAt).format('YYYY-MM-DD hh:mm:ss') : null
                schedulerObject['service=scheduler;table=timetables;field=ends_at;'] = schedule.limit.endsAt ? moment(schedule.limit.endsAt).format('YYYY-MM-DD hh:mm:ss') : null
                schedulerObject['service=scheduler;table=timetables;field=max_executions;'] = schedule.limit.maxExecutions > 0 ? parseInt(schedule.limit.maxExecutions) : null

                return { ...this.rootObject, ...schedulerObject }
            },

            periodOptions() {
                const arr = []
                for (const key in this.periods) {
                    arr.push({
                        id: key,
                        name: this.periods[key],
                    })
                }
                return arr
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
            getSchedule() {
                const root = cloneDeep(this.rootObject)
                const frequency = root['service=scheduler;table=timetables;field=frequency;'] ? root['service=scheduler;table=timetables;field=frequency;'] : {}

                const months = {}
                moment.months().forEach((key) => { months[key.toLowerCase()] = false })
                if (frequency && frequency.months) frequency.months.forEach((key) => { months[key] = true })

                const days = {}
                moment.weekdays().forEach((key) => { days[key.toLowerCase()] = false })
                if (frequency && frequency.days) frequency.days.forEach((key) => { days[key] = true })

                const freq = {
                    days,
                    months,
                    at: frequency.at ? frequency.at[0] : '00:00',
                    recur: frequency.recur || 'daily',
                    timezone: frequency.timezone || 'Europe/London',
                }

                const startsAt = root['service=scheduler;table=timetables;field=starts_at;']
                const endsAt = root['service=scheduler;table=timetables;field=ends_at;']

                const limit = {}
                limit.startsAt = startsAt ? moment(startsAt, 'YYYY-MM-DD hh:mm:ss').format('YYYY-MM-DD hh:mm:ss') : ''
                limit.endsAt = endsAt ? moment(endsAt, 'YYYY-MM-DD hh:mm:ss').format('YYYY-MM-DD hh:mm:ss') : ''
                limit.maxExecutions = root['service=scheduler;table=timetables;field=max_executions;'] || null

                const build = {
                    frequency: freq,
                    limit,
                    timezone: frequency.timezone || 'Europe/London',
                }

                this.schedule = defaultsDeep(build, this.schedule)
            },

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

                this.schedule.frequency = defaultsDeep({ months }, this.schedule.frequency)
            },

            setAlternateMonths() {
                let month
                const months = {}
                this.alternating_start = this.alternating_start === 1 ? 0 : 1

                const index = this.alternating_start % 2 ? 1 : 0
                const altIndex = this.alternating_start % 2 ? 0 : 1

                for (let i = index; i < 12; i += 2) {
                    month = moment().month(i)
                    months[month.format('MMMM').toLowerCase()] = true
                }

                for (let i = altIndex; i < 12; i += 2) {
                    month = moment().month(i)
                    months[month.format('MMMM').toLowerCase()] = false
                }

                this.schedule.frequency = defaultsDeep({ months }, this.schedule.frequency)
            },

            setAllWorking() {
                this.schedule.frequency = defaultsDeep({
                    days: {
                        monday: true,
                        tuesday: true,
                        wednesday: true,
                        thursday: true,
                        friday: true,
                        saturday: false,
                        sunday: false,
                    },
                }, this.schedule.frequency)
            },

            setAll() {
                this.setAllWorking()
                this.$nextTick(() => {
                    this.schedule.frequency = defaultsDeep({
                        days: {
                            monday: true,
                            tuesday: true,
                            wednesday: true,
                            thursday: true,
                            friday: true,
                            saturday: true,
                            sunday: true,
                        },
                    }, this.schedule.frequency)
                })
            },

            clearAll() {
                this.setAllWorking()
                this.$nextTick(() => {
                    this.schedule.frequency = defaultsDeep({
                        days: {
                            monday: false,
                            tuesday: false,
                            wednesday: false,
                            thursday: false,
                            friday: false,
                            saturday: false,
                            sunday: false,
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
            this.$refs.startDate.$refs.pickerfield.setAttribute('readonly', 'true')
            this.$refs.endDate.$refs.pickerfield.setAttribute('readonly', 'true')
            this.$nextTick(() => {
                $(this.$el).children('.ui.checkbox').checkbox()
                this.$refs.endDate.picker.setMoment(this.getEndDate)
            })
        },
    }
</script>
