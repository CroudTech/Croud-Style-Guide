<template>
    <div class="ui segment basic">

    <div class="ui two column grid">
        <div class="ui column">
            <strong>Date Range</strong>
        </div>
        <div class="ui column">
            <croud-date-range :start.sync="baseSchedule.range.start" :end.sync="baseSchedule.range.end"></croud-date-range>
        </div>
        <div class="ui column">
            <strong>Time</strong>
        </div>
        <div class="ui column">
            <croud-time v-model="baseSchedule.time_of_day" />
        </div>
        <div class="ui column">
            <strong>Occurs</strong>
        </div>
        <div class="ui column">
            <semantic-form-dropdown v-model="baseSchedule.occurance" :options="occuranceOptions"></semantic-form-dropdown>
        </div>
    </div>

    <component :is="baseSchedule.occurance" :schedule.sync="baseSchedule" @reset-schedule="scheduleReset"></component>

    <div class="ui basic right aligned segment">
        <slot name="actions">
            <button class="ui mini button" @click="cancelSchedule">
                Cancel
            </button>
            <button class="ui mini yellow button" @click="updateSchedule">
                Set Schedule
            </button>
        </slot>
    </div>
  </div>
</template>

<script>
    import { omit, pick } from 'lodash'
    import moment from 'moment'

    import Daily from './views/Daily'
    import Weekly from './views/Weekly'
    import SameDayEachMonth from './views/SameDayEachMonth'
    import SameDayEachYear from './views/SameDayEachYear'
    import SameWeekEachMonth from './views/SameWeekEachMonth'
    import SameWeekEachYear from './views/SameWeekEachYear'

    /**
     * New schedule editor
     *
     * @example ./croud-schedule-editor.md
     */
    export default {
        name: 'croud-schedule-editor',

        components: {
            Daily,
            Weekly,
            SameDayEachMonth,
            SameDayEachYear,
            SameWeekEachMonth,
            SameWeekEachYear,
        },

        props: {
            /**
             * Pre-populate the schedule object
             */
            schedule: {
                type: Object,
                default() {
                    return {}
                },
            },

            /**
             * Timezone value
             */
            timezone: {
                type: String,
                default: 'Europe/London',
            },
        },

        data() {
            return {
                resetOmits: ['timezone', 'range', 'time_of_day', 'periodic'],
                occurances: {
                    Daily: 'Daily',
                    Weekly: 'Weekly',
                    SameDayEachMonth: 'Same day each month',
                    SameWeekEachMonth: 'Same week each month',
                    SameDayEachYear: 'Same day each year',
                    SameWeekEachYear: 'Same week each year',
                },

                baseSchedule: {
                    timezone: this.timezone,
                    occurance: 'Daily',
                    type: 'periodic',
                    range: {
                        start: moment().format('YYYY-MM-DD'),
                        end: moment().add(3, 'months').endOf('month').format('YYYY-MM-DD'),
                    },
                    time_of_day: '09:00',
                    interval: 1,
                    period: 'days',
                    day_of_month: false,
                    week_of_month: false,
                    days: {},
                    months: {},
                },
            }
        },

        computed: {
            occuranceOptions() {
                return Object.keys(this.occurances).map(id => ({ id, name: this.occurances[id] }))
            },
        },

        methods: {
            scheduleUpdate(schedule) {
                this.baseSchedule = schedule
            },

            scheduleReset(resets) {
                this.baseSchedule = {
                    ...pick(this.baseSchedule, this.resetOmits),
                    ...omit(this.baseSchedule, this.resetOmits),
                    ...resets,
                }
            },

            /**
             * Cancel changes to the schedule
             *
             * @public
             * @returns void
             */
            cancelSchedule() {
                this.$emit('cancelled', this.baseSchedule)
                this.baseSchedule = {
                    ...this.baseSchedule,
                    ...this.schedule,
                }
            },

            /**
             * Emit update:schedule event
             *
             * @public
             * @returns void
             */
            updateSchedule() {
                this.baseSchedule.timezone = this.timezone
                this.$emit('update:schedule', this.baseSchedule)
            },
        },

        created() {
            this.baseSchedule = {
                ...this.baseSchedule,
                ...this.schedule,
            }
        },
    }
</script>
