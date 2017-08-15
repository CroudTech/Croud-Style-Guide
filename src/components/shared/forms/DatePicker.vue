<template>
    <span>
        <div class="ui action input" :class="{fluid: fluid}">
            <input ref="pickerfield" @click.prevent.enter="updateDate" :value="displayDate" type="text" :placeholder="placeholder">
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

   /**
    * A date picker based around pikaday
    *
    * @example ./croud-date-picker.md
    */
    export default {
        name: 'croud-date-picker',

        model: {
            prop: 'date',
        },

        props: {
           /**
            * Placeholder text
            */
            placeholder: {
                type: String,
                default: 'Date...',
            },

           /**
            * v-model alias, can be iso string or moment object
            */
            date: {
                type: [Object, String],
                default: null,
            },

           /**
            * Pikaday minDate setting, must be a Date Object (ie. moment().toDate())
            */
            minDate: {
                type: Date,
                default: null,
            },

           /**
            * Pikaday maxDate setting, must be a Date Object (ie. moment().toDate())
            */
            maxDate: {
                type: Date,
                default: null,
            },

           /**
            * Moment format string
            * @see https://momentjs.com/docs/#/displaying/format/
            */
            display: {
                type: String,
                default: 'D MMM YYYY',
            },

           /**
            * Allow date picker to take up available space
            */
            fluid: {
                type: Boolean,
                default: false,
            },

           /**
            * Pikaday config
            * @see https://github.com/dbushell/Pikaday#configuration
            */
            settings: {
                type: Object,
                default() {
                    return {}
                },
            },
        },

        data() {
            return {
                internalDate: null,
                displayDate: null,
                picker: null,
            }
        },

        watch: {
            date(value) {
                if (value && this.picker && this.internalDate && moment(value).format() !== this.internalDate.format()) {
                    this.picker.setMoment(moment(value))
                }
            },
        },

        methods: {
            updateDate() {
                this.internalDate = moment(croudDate(this.displayDate))
            },

            create() {
                if (this.picker) this.picker.destroy()
                const settings = {
                    minDate: this.minDate,
                    maxDate: this.maxDate,
                    format: this.display,
                    field: this.$refs.pickerfield,
                    trigger: this.$refs.pickerbutton,
                    onSelect: (val) => {
                        this.internalDate = moment(val)
                        this.displayDate = this.internalDate.format(this.display)
                        this.$emit('date-selected', this.internalDate)
                        this.$emit('input', this.internalDate.format('YYYY-MM-DD'))
                        if (this.settings.afterSelect && typeof this.settings.afterSelect === 'function') { this.settings.afterSelect(this.internalDate) }
                    },
                }

                this.picker = new Pikaday(_.defaultsDeep(settings, this.settings))
                if (this.internalDate) this.picker.setMoment(this.internalDate)
            },
        },

        mounted() {
            if (this.date) {
                this.internalDate = moment(this.date)
                this.displayDate = this.internalDate.format(this.display)
            }

            this.create()
        },

        beforeDestroy() {
            if (this.picker) this.picker.destroy()
        },
    }

</script>

<style lang="scss">
    @import './pikaday-theme/pikaday.scss';
</style>
