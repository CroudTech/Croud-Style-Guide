<template>
    <div class="ui center aligned column">
        {{ title }}
        <table class="ui tiny very basic fixed table">
            <thead>
                <th v-for="day in dayOptions" class="center aligned" :key="day">{{ day }}</th>
            </thead>

            <tbody>
                <tr v-for="week in weeks" :key="week">
                    <td class="center aligned" v-for="(day, i) in week.days" :key="i">
                        <span class="ui tiny yellow circular" :class="{label: day.highlight}">{{ day.day }}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import moment from 'moment'

    /**
     * Quick summary view of events in a month
     *
     * @example ./month-view.md
     */
    export default {
        name: 'month-view',

        props: {

            /**
             * ISO string or Moment object of a date in the month
             */
            month: {
                type: [String, Object],
                default: moment(),
            },

            /**
             * Array of dates to highlight
             */
            highlight: {
                type: Array,
                default: () => [],
            },
        },

        computed: {
            title() {
                return moment(this.month).format('MMMM')
            },

            daysInMonth() {
                return moment(this.month).daysInMonth()
            },

            firstWeekday() {
                return moment(this.month).startOf('month').weekday()
            },

            dayOptions() {
                return moment.weekdaysMin()
            },

            weeks() {
                const month = moment(this.month).month()
                const startWeek = moment(this.month).startOf('month').week()
                let endWeek = moment(this.month).endOf('month').week()

                if (endWeek === 1) endWeek = startWeek + 5

                const calendar = []
                for (let week = startWeek; week <= endWeek; week += 1) {
                    calendar.push({
                        week,
                        days: Array(7).fill(0).map((n, i) => {
                            const day = moment().week(week).startOf('week').add(n + i, 'day')
                            if (month !== day.month()) return {}
                            return {
                                day: day.format('D'),
                                highlight: this.highlightDates.indexOf(day.format('D')) !== -1,
                            }
                        }),
                    })
                }

                return calendar
            },

            highlightDates() {
                const month = moment(this.month).month()
                return this.highlight.filter(d => d.month() === month).map(d => d.format('D'))
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import '../../../resources/sass/variables/_all.scss';

    .ui.table tr td {
        border-top: none;
        font-size: $croud-font-size-tiny;
        padding: 1px;
        height: auto;
    }

    .ui.table th {
        font-size: $croud-font-size-small;
        height: auto;
    }

    .ui.table.basic td.highlight {
        border-radius: 50%;
    }

    .ui.grid>.column:not(.row) {
        padding-bottom: 0;
    }
</style>
