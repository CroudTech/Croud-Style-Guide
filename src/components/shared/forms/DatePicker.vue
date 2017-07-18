<template>
    <span>
        <div class="ui action input" :class="{fluid: fluid}">
            <input ref="pickerfield" @click.prevent.enter="updateDate" :value="display_date" type="text" :placeholder="placeholder">
            <button @click.prevent ref="pickerbutton" class="ui icon button">
                <i class="calendar outline icon"></i>
            </button>
        </div>
    </span>
</template>

<script>
    import _ from 'lodash'
    import Pikaday from 'pikaday'
    import croudDate from 'croud-date-parser'
    import moment from 'moment'

    export default {
        name: 'croud-date-picker',

        model: {
            prop: 'date',
        },

        props: {
            placeholder: {
                default: 'Date..',
            },

            date: {
                default: null,
            },

            min_date: {
                default: null,
            },

            max_date: {
                default: null,
            },

            reference: {
                default: null,
            },

            display: {
                default: 'D MMM YYYY',
            },

            fluid: {
                default: false,
            },

            settings: {
                type: Object,
                default() {
                    return {}
                },
            },
        },

        data() {
            return {
                internal_date: null,
                display_date: null,
                picker: null,
            }
        },

        watch: {
            date(value) {
                if (value && this.picker && this.internal_date && moment(value).format() !== this.internal_date.format()) {
                    this.picker.setMoment(moment(value))
                }
            },
        },

        methods: {
            updateDate() {
                this.internal_date = moment(croudDate(this.display_date))
            },

            create() {
                const inst = this
                if (this.picker) this.picker.destroy()
                const settings = {
                    format: this.display,
                    field: this.$refs.pickerfield,
                    trigger: this.$refs.pickerbutton,
                    onSelect: (val) => {
                        this.internal_date = moment(val)
                        this.display_date = this.internal_date.format(this.display)
                        this.$emit('date-selected', this.internal_date)
                        this.$emit('input', this.internal_date.format('YYYY-MM-DD'))
                        if (this.settings.afterSelect && typeof this.settings.afterSelect === 'function') { this.settings.afterSelect(this.internal_date) }
                    },
                }

                this.picker = new Pikaday(_.defaultsDeep(settings, this.settings))
                if (this.internal_date) this.picker.setMoment(this.internal_date)
            },
        },

        mounted() {
            if (this.date) {
                this.internal_date = moment(this.date)
                this.display_date = this.internal_date.format(this.display)
            }

            this.create()
        },

        beforeDestroy() {
            if (this.picker) this.picker.destroy()
        },
    }

</script>
