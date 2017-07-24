<template>
    <span>{{ formattedDate }}</span>
</template>

<script>
    import moment from 'moment'

    /**
     * Preformatted date component
     *
     * @example ./croud-date.md
     */
    export default {
        name: 'croud-date',

        props: {
            /**
             * Moment date object or iso compliant string
             */
            date: {
                type: Object || String,
                required: true,
            },

            /**
             * Moment.js format string
             * @see https://momentjs.com/docs/#/displaying/
             */
            format: {
                type: String,
                default: 'lll',
            },
        },

        computed: {
            formattedDate() {
                return moment(this.date).format(this.format)
            },
        },
    }
</script>
