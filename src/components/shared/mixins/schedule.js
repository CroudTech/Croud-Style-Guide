import { cloneDeep, defaultsDeep, defaults } from 'lodash'
import moment from 'moment-timezone'

export default {
    data() {
        return {
            keys: {
                frequency: 'service=scheduler;table=timetables;field=frequency;',
                startsAt: 'service=scheduler;table=timetables;field=starts_at;',
                endsAt: 'service=scheduler;table=timetables;field=ends_at;',
                maxExecutions: 'service=scheduler;table=timetables;field=max_executions;',
            },
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
                        sunday: false,
                        monday: false,
                        tuesday: false,
                        wednesday: false,
                        thursday: false,
                        friday: false,
                        saturday: false,
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

    methods: {
        getSchedule() {
            const root = cloneDeep(this.rootObject)
            const frequency = root[this.keys.frequency] || {}

            const months = {}
            moment.months().forEach((key) => { months[key.toLowerCase()] = false })
            if (frequency && frequency.months) frequency.months.forEach((key) => { months[key] = true })

            const days = {}
            moment.weekdays().forEach((key) => { days[key.toLowerCase()] = false })
            if (frequency && frequency.days) frequency.days.forEach((key) => { days[key] = true })

            const freq = defaults({
                days,
                months,
                at: frequency.at ? frequency.at[0] : undefined,
            }, frequency)

            const limit = {
                startsAt: root[this.keys.startsAt] || undefined,
                endsAt: root[this.keys.endsAt] || undefined,
                maxExecutions: root[this.keys.maxExecutions] || undefined,
            }

            const build = {
                frequency: freq,
                limit,
            }

            this.schedule = defaultsDeep(build, this.schedule)
        },
    },
}
