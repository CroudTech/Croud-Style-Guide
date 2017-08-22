<template>
    <div class="ui two column grid">
        <div class="ui column">
            <strong>Every</strong>
        </div>
        <div class="ui column">
            <div class="ui right labeled input">
                <input type="number" v-model="interval" min="1">
                <div class="ui label">weeks</div>
            </div>
        </div>

        <div class="ui column">
            <strong>On</strong>
        </div>
        <div class="ui column">
            <div class="ui mini buttons">
                <button class="ui button" :class="{basic: !allDays, blue: allDays}" @click="everyday">Everyday</button>
                <button class="ui button" :class="{basic: !allWeekdays, blue: allWeekdays}" @click="weekdays">Weekdays</button>
            </div>

            <div>
                <div class="ui day label" v-for="(active, day) in weekdayDays" :class="{basic: !active}" @click="localDays[day] = !localDays[day]">{{ day }}</div>
            </div>

            <div>
                <div class="ui day label" v-for="(active, day) in weekendDays" :class="{basic: !active}" @click="localDays[day] = !localDays[day]">{{ day }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import { omit, pick } from 'lodash'
    import Mixin from './EditorViews'

    export default {
        mixins: [Mixin],

        data() {
            return {
                weekend: ['sat', 'sun'],
                resets: {
                    period: 'days',
                    interval: 1,
                    days: {
                        mon: true,
                        tue: true,
                        wed: true,
                        thu: true,
                        fri: true,
                        sat: false,
                        sun: false,
                    },
                },
                localDays: {
                    mon: true,
                    tue: true,
                    wed: true,
                    thu: true,
                    fri: true,
                    sat: false,
                    sun: false,
                },
            }
        },

        methods: {
            everyday() {
                Object.keys(this.localDays).forEach((day) => {
                    this.localDays[day] = true
                })
            },

            weekdays() {
                Object.keys(this.localDays).forEach((day) => {
                    this.localDays[day] = this.weekend.indexOf(day) === -1
                })
            },
        },

        computed: {
            weekdayDays() {
                return omit(this.localDays, this.weekend)
            },

            weekendDays() {
                return pick(this.localDays, this.weekend)
            },

            allDays() {
                return Object.keys(this.localDays).every(day => this.localDays[day])
            },
            allWeekdays() {
                return !this.allDays && Object.keys(omit(this.localDays, this.weekend)).every(day => this.localDays[day])
            },
        },

        watch: {
            localDays: {
                deep: true,
                handler(val) {
                    this.$emit('update:schedule', {
                        ...this.schedule,
                        days: val,
                    })
                },
            },
        },
    }
</script>

<style scoped>
    .ui.day.label {
        margin-top: 5px;
        text-transform: capitalize;
    }
</style>
