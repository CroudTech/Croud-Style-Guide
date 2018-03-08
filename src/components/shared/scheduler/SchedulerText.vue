<template>
    <div>
        <span v-if="ended">Ran at</span>
        <span v-else>Runs at</span>

        <strong>{{ schedule.frequency.at }}</strong>

        <span v-html="daysText"></span>

        <span v-if="periodText">
            on <strong>{{ periodText }}</strong>
        </span>

        <span v-html="monthsText"></span>

        <span v-html="datesText"></span>
    </div>
</template>

<script>
    import moment from 'moment'
    import { difference } from 'lodash'
    import schedule from '../mixins/schedule'

/**
* Text representation of a schedule
*
* @example ./croud-scheduler-text.md
*/
export default {
        name: 'croud-scheduler-text',

        mixins: [schedule],

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

        data() {
            return {
                weekdays: moment.weekdays().slice(1, -1),
                dateFormat: 'll',
                ended: false,
                periods: {
                    daily: false,
                },
            }
        },

        computed: {
            days() {
                return this.schedule.frequency.days
            },

            months() {
                return this.schedule.frequency.months
            },

            daysText() {
                const days = Object.keys(this.days).filter(key => this.days[key]).map(key => `${key[0].toUpperCase()}${key.substr(1)}`)

                if (!days.length || days.length === 7) {
                    return '<strong>every day</strong>'
                }

                if (difference(this.weekdays, days).length === 0) {
                    return 'on <strong>weekdays</strong>'
                }

                return `on <strong>${this.joinText(days)}</strong>`
            },

            monthsText() {
                const months = Object.keys(this.months).filter(key => this.months[key]).map(key => `${key[0].toUpperCase()}${key.substr(1)}`)

                if (!months.length || months.length === 12) {
                    return ''
                }

                return `during <strong>${this.joinText(months)}</strong>`
            },

            periodText() {
                return this.periods[this.schedule.frequency.recur]
            },

            datesText() {
                this.ended = false
                const today = moment()

                const startsAt = this.schedule.limit.startsAt ? moment(this.schedule.limit.startsAt) : null
                const endsAt = this.schedule.limit.endsAt ? moment(this.schedule.limit.endsAt) : null

                if (startsAt && startsAt.isAfter(today) && endsAt && endsAt.isAfter(today)) {
                    return `between <strong>${startsAt.format(this.dateFormat)}</strong> & <strong>${endsAt.format(this.dateFormat)}</strong>`
                }

                if (startsAt && startsAt.isAfter(today)) {
                    return `starting from <strong>${startsAt.format(this.dateFormat)}</strong>`
                }

                if (endsAt && endsAt.isAfter(today)) {
                    return `ending on <strong>${endsAt.format(this.dateFormat)}</strong>`
                }

                if (endsAt && endsAt.isBefore(today)) {
                    this.ended = true
                    return `but ended on <strong>${endsAt.format(this.dateFormat)}</strong>`
                }

                return ''
            },
        },

        methods: {
            joinText(arr, joiner = ', ', finalJoiner = ' & ') {
                return [
                    arr.slice(0, -1).join(joiner),
                    arr.slice(-1)[0],
                ].join(arr.length < 2 ? '' : finalJoiner)
            },
        },

        created() {
            this.getSchedule()
        },

        watch: {
            rootObject: 'getSchedule',
        },
    }
</script>
