import moment from 'moment'
import { zipWith } from 'lodash'

export default {
    props: {
        schedule: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            resets: {},

            periods: [
                'First',
                'Second',
                'Third',
                'Fourth',
                'Last',
            ],
        }
    },

    computed: {
        interval: {
            get() {
                return this.schedule.interval
            },
            set(val) {
                this.$emit('update:schedule', {
                    ...this.schedule,
                    interval: val,
                })
            },
        },

        dayOfMonth: {
            get() {
                return this.schedule.day_of_month
            },
            set(val) {
                this.$emit('update:schedule', {
                    ...this.schedule,
                    day_of_month: val,
                })
            },
        },

        weekOfMonth: {
            get() {
                return this.schedule.week_of_month
            },
            set(val) {
                this.$emit('update:schedule', {
                    ...this.schedule,
                    week_of_month: val,
                })
            },
        },

        days: {
            get() {
                return Object.keys(this.schedule.days).filter(day => this.schedule.days[day]).join(',')
            },
            set(val) {
                const days = {}

                val.split(',').forEach((day) => {
                    days[day.toLowerCase()] = true
                })

                this.$emit('update:schedule', {
                    ...this.schedule,
                    days,
                })
            },
        },

        months: {
            get() {
                return Object.keys(this.schedule.months).filter(month => this.schedule.months[month]).join(',')
            },
            set(val) {
                const months = {}

                val.split(',').forEach((month) => {
                    months[month] = true
                })

                this.$emit('update:schedule', {
                    ...this.schedule,
                    months,
                })
            },
        },

        periodOptions() {
            const periods = []
            this.periods.forEach((period) => {
                periods.push({ id: period.toLowerCase(), name: period })
            })
            return periods
        },

        dayOptions() {
            return zipWith(moment.weekdaysShort().map(day => day.toLowerCase()), moment.weekdays(), (id, name) => ({ id, name }))
        },

        monthOptions() {
            return zipWith(moment.monthsShort().map(month => month.toLowerCase()), moment.months(), (id, name) => ({ id, name }))
        },

        ordinal() {
            return moment.localeData().ordinal(this.dayOfMonth).slice(-2)
        },
    },

    methods: {
        load() {
            this.$emit('reset-schedule', this.resets)
        },
    },

    ready() {
        this.load()
    },

    mounted() {
        this.load()
    },
}
