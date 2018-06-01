
<template>
    <div>
        <div class="ui basic secondary segment">
            <div class="ui three column middle aligned grid">
                <div class="seven wide left column">
                    <div class="ui tiny icon buttons">
                        <button class="ui button" @click="step('prev')">
                            <i class="left chevron icon"></i>
                        </button>
                        <button class="ui button" @click="step('next')">
                            <i class="right chevron icon"></i>
                        </button>
                    </div>
                    &nbsp;
                    <div class="ui tiny buttons">
                        <button class="ui button" @click="step('today')">Today</button>
                    </div>
                    &nbsp;
                    <div class="ui tiny buttons">
                        <button class="ui button" v-for="view in views" :key="view.view" :class="{blue: currentView === view.view}" @click="changeView(view.view)">{{ view.title }}</button>
                    </div>
                </div>

                <div class="two wide center aligned column">
                    <h2 class="ui grey header">{{ title }}</h2>
                </div>
                <div class="seven wide right aligned column">
                    <div class="ui text menu">
                        <div class="right item">
                            <div class="ui text menu">
                                <slot name="filters">
                                    <div class="item">&nbsp;</div>
                                </slot>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="calendar-wrapper">
            <full-calendar
                        ref="calendar"
                        class="calendar"
                        :config="computedConfig"
                        v-bind="$attrs"
                        v-on="$listeners">
            </full-calendar>
            <croud-loader class="croud-loader" :loading="loading"></croud-loader>
        </div>
    </div>
</template>

<script>
    import CroudLoader from '../misc/Loader'

    /**
    * Opinionated wrapper of the fullcalendar component
    *
    * @example ./croud-full-calendar.md
    */
    export default {
        name: 'croud-full-calendar',

        components: {
            CroudLoader,
        },

        props: {
            /**
             * Array of view objects in format `{view: 'basicWeek', title: 'Week'}`
             * @see https://fullcalendar.io/docs#toc
             */
            views: {
                type: Array,
                default: () => [
                    { view: 'month', title: 'Month' },
                    { view: 'basicWeek', title: 'Week' },
                    { view: 'basicDay', title: 'Day' },
                ],
            },

            /**
             * vue-full-calendar config
             * @see https://github.com/CroudTech/vue-fullcalendar#custom-config
             */
            config: {
                type: Object,
                default: () => ({}),
            },
        },

        data() {
            return {
                loading: false,
                currentView: '',
                title: '',
            }
        },

        methods: {
            fireMethod(...args) {
                return this.$refs.calendar.fireMethod(...args)
            },

            setTitle() {
                const view = this.$refs.calendar.fireMethod('getView')
                this.title = view.title
                this.currentView = view.type
            },

            step(direction = 'next') {
                this.$refs.calendar.fireMethod(direction)
                this.setTitle()
            },

            changeView(view) {
                this.$refs.calendar.fireMethod('changeView', view)
                this.setTitle()
            },
        },

        computed: {
            clientChannels() {
                return this.client.channels.data.map(channel => ({
                    id: channel.id,
                    name: channel.channelType.data.name,
                }))
            },

            computedConfig() {
                const self = this
                return {
                    header: false,
                    firstDay: 1,
                    defaultView: 'month',
                    loading: (isLoading) => {
                        self.loading = isLoading
                    },
                    ...this.config,
                }
            },
        },

        mounted() {
            this.setTitle()
        },

    }
</script>

<style lang="scss" scoped>
    @import '/../../../resources/croudCalendar.scss';

    .calendar-wrapper {
        position: relative;
    }

    .ui.secondary.basic.segment {
        padding: 0.5em 0;
        margin: 0;

        .column {
            padding-top: 0;
            padding-bottom: 0;

            &.left {
                padding-left: 2em;
            }

            &.right > .ui.text.menu {
                min-height: 6.5em;
            }
        }

        .ui.text.menu {
            margin: 0;
            padding: 0;
        }

        .right.item {
            padding: 0;
            margin: 0;

            >.item {
                padding: 0 1em 1em;

                .segment {
                    padding: 0;
                    margin: 0;
                }
            }
        }
    }
</style>

