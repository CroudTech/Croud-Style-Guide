import { cloneDeep, defaultsDeep } from 'lodash'
import moment from 'moment-timezone'

export default {
    data() {
        return {
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
                    endsAt: '',
                    maxExecutions: null,
                },
            },
        }
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
    },
}
