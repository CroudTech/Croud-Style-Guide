<template>
    <semantic-form-dropdown v-model="time" :options="timeOptions" @dropdown-selected="selected"></semantic-form-dropdown>
</template>

<script>
    /**
     * Time picker component
     *
     * @example ./croud-time.md
     */
    export default {
        name: 'croud-time',

        props: {
            /**
             * v-model alias
             */
            value: {
                type: String,
                required: true,
            },
        },

        computed: {
            time() {
                return this.value
            },

            timeOptions() {
                let value
                const arr = []
                for (let i = 0; i < 24; i += 1) {
                    for (let t = 0; t < 60; t += 15) {
                        value = `${this.pad(i)}:${this.pad(t)}`
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
        },

        methods: {
            pad: value => (value < 10 ? `0${value}` : value),

            selected(val) {
                this.$emit('input', val)
            },
        },
    }
</script>
