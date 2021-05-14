<template>
    <div class="ui input" :class="{error: error}">
        <input type="date" v-model="date" :min="minDate" :max="maxDate"/>
    </div>
</template>

<script>
    import moment from 'moment'

    /**
     * Date input
     *
     * @example ./croud-date-input.md
     */
    export default {
        name: 'croud-date-input',

        props: {
            /**
            * Alias for v-model, value of the date input as a moment object or an iso string
            */
            value: {
                type: [Object, String],
                required: true,
            },

            /**
             * Minimum date as a moment object or an iso string
             */
            min: {
                type: [Object, String],
            },

            /**
             * Maximum date as a moment object or an iso string
             */
            max: {
                type: [Object, String],
            },
        },

        data() {
            return {
                format: 'YYYY-MM-DD',
                error: false,
            }
        },

        computed: {
            date: {
                get() {
                    const date = moment(this.value)
                    return date.isValid() ? moment(this.value).format(this.format) : this.value
                },
                set(val) {
                    const date = moment(val, this.format, true)

                    if (!date.isValid()) {
                        this.$emit('invalid-date', date)
                        this.error = true
                    } else if ((this.max && date.isAfter(moment(this.max), 'd'))
                                || (this.min && date.isBefore(moment(this.min), 'd'))) {
                        this.$emit('validation-error', date)
                        this.error = true
                    } else {
                        this.error = false
                    }

                    this.$emit('input', date.isValid() ? date : val)
                },
            },

            minDate() {
                return this.min ? moment(this.min).format(this.format) : null
            },

            maxDate() {
                return this.max ? moment(this.max).format(this.format) : null
            },
        },
    }
</script>
