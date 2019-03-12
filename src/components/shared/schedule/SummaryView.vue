<template>
    <div class="ui four column center aligned grid">
        <month-view v-for="month in months" :month="month" :highlight="highlight" :key="month"></month-view>
    </div>
</template>

<script>
    import moment from 'moment'
    import MonthView from './MonthView'

    /**
     * Show an **at a glance** summary of your schedule
     *
     * @example ./summary-view.md
     */
    export default {
        name: 'summary-view',

        components: {
            MonthView,
        },

        props: {
            /**
             * Date range object with **start** and **end** keys
             */
            range: {
                type: Object,
                default() {
                    return {
                        start: moment().startOf('year'),
                        end: moment().endOf('year'),
                    }
                },
            },

            /**
             * Array of dates to highlight
             */
            highlight: {
                type: Array,
                default() {
                    return []
                },
            },
        },

        computed: {
            months() {
                const months = []
                const start = moment(this.range.start).startOf('month')
                while (start.isSameOrBefore(moment(this.range.end))) {
                    months.push(moment(start).format('YYYY-MM-DD'))
                    start.add(1, 'months')
                }
                return months
            },
        },
    }
</script>
