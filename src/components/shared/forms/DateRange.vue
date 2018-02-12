<template>
    <span>
        <div ref="input" class="ui input">
            <input ref="field" v-model="display" readonly>
        </div>
        <div class="ui flowing popup">
            <div class="ui two column divided center aligned grid">
                <div class="sixteen wide column">
                    <h2 class="ui croud header">{{ display }}</h2>
                </div>
                <div class="six wide column">
                    <strong>Quick Selection</strong>
                    <div v-if="!dateRangeOnly" class="ui fluid vertical menu">
                        <a class="item" @click="quickSet('today')">Today</a>
                        <a class="item" @click="quickSet('yesterday')">Yesterday</a>
                    </div>

                    <div class="ui fluid vertical menu">
                        <a class="item" @click="quickSet('month')">Last Month</a>
                        <a class="item" @click="quickSet('week')">Last Week</a>
                    </div>

                    <div class="ui fluid vertical menu">
                        <a class="item" @click="quickSetStart('month')">This Month</a>
                        <a class="item" @click="quickSetStart('isoWeek')">This Week</a>
                    </div>
                </div>
                <div class="ten wide column">
                    <h2 class="ui header">{{ message }}</h2>
                    <div class="calendar" ref="calendar"></div>
                    <div class="date-range-toggle">
                        <croud-checkbox v-if="!dateRangeOnly" name="showThat" v-model="isRange" class="primary"/>
                        <strong v-if="!dateRangeOnly" class="toggle-label" @click="isRange = !isRange">Use date Range</strong>
                        <button v-if="showClear" class="ui mini primary right floated button" @click="clearPickerSelection">Clear</button>
                    </div>
                </div>
            </div>
        </div>
    </span>
</template>

<script>
    import Pikaday from 'pikaday'
    import moment from 'moment'
    import { cloneDeep } from 'lodash'
    import CroudCheckbox from './Checkbox'

    /**
    * A single range or date range combination workflow component based around pikaday
    *
    * This component emits two events **update:start** and **update:end** so can support the *prop.sync* notation
    *
    * @example ./croud-date-range.md
    */
    export default {
        name: 'croud-date-range',

        components: { CroudCheckbox },

        props: {
            /**
             * Start date moment object or iso string
             */
            start: {
                type: [Object, String],
                required: true,
            },

            /**
             * End date moment object or iso string
             */
            end: {
                type: [Object, String],
                required: true,
            },

            /**
             * Events/days to highlight
             */
            events: {
                type: Array,
                default() {
                    return []
                },
            },

            /**
             * Only allow dateRanges
             */
            dateRangeOnly: {
                type: Boolean,
                default() {
                    return false
                },
            },
        },

        data() {
            return {
                localStart: moment(this.start),
                localEnd: moment(this.end),
                picker: null,
                stage: 'start',
                isRange: false,
                showClear: false,
                prevStart: {},
                prevEnd: {},
            }
        },

        computed: {
            display() {
                if (this.isRange) return `${moment(this.localStart).format('ll')} - ${moment(this.localEnd).format('ll')}`
                return `${moment(this.localStart).format('ddd Do MMMM YYYY')}`
            },

            title() {
                if (this.isRange) return `${moment(this.localStart).format('dddd Do MMMM YYYY')} - ${moment(this.localEnd).format('dddd Do MMMM YYYY')}`
                return `${moment(this.localStart).format('dddd Do MMMM YYYY')}`
            },

            message() {
                if (this.isRange) return `Select your ${this.stage} date`
                return 'Select a date'
            },
        },

        methods: {
            clearPickerSelection() {
                this.buildCal()
                this.$nextTick(() => {
                    this.picker.show()
                })
            },

            buildCal() {
                if (this.picker) this.picker.destroy()
                this.showClear = false
                this.stage = 'start'
                this.picker = new Pikaday({
                    container: this.$refs.calendar,
                    field: this.$refs.field,
                    firstDay: 1,
                    bound: false,
                    defaultDate: moment(this.localStart).toDate(),
                    setDefaultDate: !this.isRange,
                    format: 'ddd Do MMMM YYYY',
                    events: this.events,
                    onSelect: (() => {
                        let init = true
                        let start = ''
                        let end = ''
                        return (date) => {
                            if (this.isRange) {
                                if (init) {
                                    this.picker.setStartRange()
                                    this.picker.setEndRange()
                                    this.picker.draw()
                                    this.$nextTick(() => {
                                        start = date
                                        this.picker.setStartRange(date)
                                        this.picker.setMinDate(date)
                                        this.showClear = true
                                        this.stage = 'end'
                                    })
                                } else {
                                    end = date
                                    this.picker.setMinDate()
                                    this.$nextTick(() => this.setRange(start, end))
                                }
                                init = !init
                            } else {
                                this.setSingleDate(date)
                            }
                        }
                    })(),
                })
                this.$nextTick(() => {
                    if (this.isRange) {
                        this.picker.setStartRange(moment(this.localStart).toDate())
                        this.picker.setEndRange(moment(this.localEnd).toDate())
                        this.$nextTick(this.picker.draw())
                    }
                })
            },

            setRange(start, end) {
                this.localStart = moment(start)
                this.localEnd = moment(end)
                this.closePopup()
            },

            setSingleDate(date) {
                this.localStart = moment(date)
                this.localEnd = moment(date)
                this.closePopup()
            },

            quickSet(period) {
                if (period === 'today') {
                    this.isRange = false
                    this.localStart = moment().startOf('day')
                    this.localEnd = moment().endOf('day')
                } else if (period === 'yesterday') {
                    this.isRange = false
                    this.localStart = moment().startOf('day').add(-1, 'days')
                    this.localEnd = moment().endOf('day').add(-1, 'days')
                } else if (period === 'month') {
                    this.isRange = true
                    this.localStart = moment().add(-1, period).startOf('month')
                    this.localEnd = moment().add(-1, period).endOf('month')
                } else if (period === 'week') {
                    this.isRange = true
                    this.localStart = moment().startOf('isoweek').add(-1, period)
                    this.localEnd = moment().endOf('isoweek').add(-1, period)
                } else {
                    this.isRange = true
                    this.localStart = moment().startOf('day').add(-1, period)
                    this.localEnd = moment().endOf('day')
                }
                this.closePopup()
            },

            quickSetStart(period) {
                this.isRange = true
                this.localStart = moment().startOf(period)
                this.localEnd = moment().endOf(period)
                this.closePopup()
            },

            closePopup() {
                this.picker.destroy()
                $(this.$refs.input).popup('hide')
            },
        },

        mounted() {
            this.$nextTick(() => {
                this.$emit('update:title', this.title)
                if (this.dateRangeOnly) this.isRange = true
            })
        },

        activated() {
            $(this.$refs.input)
              .popup({
                  inline: true,
                  on: 'click',
                  hoverable: true,
                  position: 'bottom left',
                  delay: {
                      show: 300,
                      hide: 500,
                  },
                  onShow: () => {
                      this.buildCal()
                      this.prevStart = cloneDeep(this.localStart)
                      this.prevEnd = cloneDeep(this.localEnd)
                  },
                  onHidden: () => {
                      this.$nextTick(() => {
                          if (!moment(this.prevStart).isSame(this.localStart)) this.$emit('update:start', this.localStart)
                          if (!moment(this.prevEnd).isSame(this.localEnd)) this.$emit('update:end', this.localEnd)
                          this.$emit('update:title', this.title)
                      })
                  },
              })
        },

        watch: {
            isRange() {
                if (!this.isRange) {
                    this.localEnd = this.localStart
                    this.buildCal()
                }
            },

            start() {
                this.localStart = this.start
                this.$emit('update:title', this.title)
            },

            end() {
                this.localEnd = this.end
                this.$nextTick(() => {
                    if (!this.dateRangeOnly && moment(this.localEnd).isSame(this.localStart)) this.isRange = false
                    this.$emit('update:title', this.title)
                })
            },
        },
    }
</script>

<style lang="scss" scoped>
@import '../../../resources/sass/variables/all.scss';

    .ui.input {
        width: 14.5em;

        input {
            text-align: center;
        }
    }

    .ui.flowing.popup {
        min-width: 465px;

        .ui.croud.header {
            margin: 0 auto;
        }

        .date-range-toggle {
            margin: 10px 5px;

            .toggle-label {
                top: -4px;
                position: relative;
                margin-left: 3px;
            }
        }
    }
</style>
