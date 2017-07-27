<template>
    <span>
        <div ref="input" class="ui input">
            <input v-model="display">
            <input ref="start" type="hidden" v-model="computedLocalStart">
            <input ref="end" type="hidden" v-model="computedLocalEnd">
        </div>
        <div class="ui flowing popup">
            <div class="ui two column divided center aligned grid">
                <div class="sixteen wide column">
                    <strong class="ui header">{{ display }}</strong>
                </div>
                <div class="six wide column">
                    <strong>Quick Selection</strong>
                    <div class="ui fluid vertical menu">
                        <a class="item" @click="quickSet('month')">Last Month</a>
                        <a class="item" @click="quickSet('week')">Last Week</a>
                    </div>

                    <div class="ui fluid vertical menu">
                        <a class="item" @click="quickSetStart('month')">This Month</a>
                        <a class="item" @click="quickSetStart('week')">This Week</a>
                    </div>
                </div>
                <div class="ten wide column">
                    <strong>{{ this.message }}</strong>
                    <div class="calendar" ref="calendar"></div>
                </div>
            </div>
        </div>
    </span>
</template>

<script>
    import Pikaday from 'pikaday'
    import moment from 'moment'

    /**
    * A date range workflow component based around pikaday
    *
    * This component emits two events **update:start** and **update:end** so can support the *prop.sync* notation
    *
    * @example ./croud-date-range.md
    */
    export default {
        name: 'croud-date-range',

        props: {
            /**
             * Start date moment object or iso string
             */
            start: {
                type: Object || String,
                required: true,
            },

            /**
             * End date moment object or iso string
             */
            end: {
                type: Object || String,
                required: true,
            },
        },

        data() {
            return {
                localStart: moment(this.start),
                localEnd: moment(this.end),
                picker: null,
                stage: 'start',
                moment,
            }
        },

        computed: {
            display() {
                return `${moment(this.localStart).format('ll')} - ${moment(this.localEnd).format('ll')}`
            },

            message() {
                return `Select your ${this.stage} date`
            },

            computedLocalStart() {
                return this.localStart.format('YYYY-MM-DD')
            },

            computedLocalEnd() {
                return this.localEnd.format('YYYY-MM-DD')
            },

            events() {
                const events = []
                const days = this.localEnd.diff(this.localStart, 'days')

                for (let i = 1; i <= days; i += 1) {
                    events.push(moment(this.localStart).add(i, 'day').toDate().toDateString())
                }

                return events
            },
        },

        methods: {
            buildStart() {
                this.stage = 'start'
                this.picker = new Pikaday({
                    container: this.$refs.calendar,
                    field: this.$refs.start,
                    firstDay: 1,
                    bound: false,
                    events: this.events,
                    onSelect: (val) => {
                        this.localStart = moment(val)
                        this.picker.destroy()
                        this.$nextTick(this.buildEnd)
                    },
                })
            },

            buildEnd() {
                this.stage = 'end'
                this.picker = new Pikaday({
                    container: this.$refs.calendar,
                    field: this.$refs.end,
                    firstDay: 1,
                    minDate: this.localStart.toDate(),
                    bound: false,
                    events: [this.localStart.toDate().toDateString()],
                    onSelect: (val) => {
                        this.localEnd = moment(val)
                        this.picker.destroy()
                        this.$nextTick(this.buildStart)
                    },
                })
            },

            quickSet(period) {
                this.localStart = moment().add(-1, period)
                this.localEnd = moment()
                this.picker.destroy()
                this.$nextTick(this.buildStart)
            },

            quickSetStart(period) {
                this.localStart = moment().startOf(period)
                this.localEnd = moment().endOf(period)
                this.picker.destroy()
                this.$nextTick(this.buildStart)
            },
        },

        mounted() {
            this.buildStart()

            $(this.$refs.input)
              .popup({
                  inline: true,
                  hoverable: true,
                  position: 'bottom left',
                  delay: {
                      show: 300,
                      hide: 800,
                  },
                  onShow: () => {
                      if (this.picker) {
                          this.picker.destroy()
                      }
                      this.$nextTick(this.buildStart)
                  },
              })
        },

        watch: {
            localEnd() {
                this.$emit('update:start', this.localStart)
                this.$emit('update:end', this.localEnd)
            },
        },

    }
</script>

<style scoped>
    .ui.flowing.popup {
        min-width: 465px;
    }
</style>

<style>
    .has-event button.pika-button {
        background-color: $croud-colour-info;
        color: $croud-colour-font-light;
    }
</style>
