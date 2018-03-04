<template>
    <span>
        <slot name="action">
           <button class="ui mini basic blue button" title="Edit schedule" @click="showModal = true">
                Edit
            </button>
        </slot>
        <semantic-modal ref="schedulerModal" title="Recurring Journal Schedule" :active="showModal" :settings="{content_classes: {content: true}, closeable: true, closeable_button: true}" @close-modal="closed()">
            <croud-schedule-editor v-if="showModal" v-model="model" @done="closeModal()"/>
        </semantic-modal>
    </span>
</template>

<script>
    import CroudScheduleEditor from './SchedulerEditor'

    /**
    * Our scheduler editor modal
    *
    * @example ./croud-scheduler-modal.md
    */

    export default {
        name: 'croud-scheduler-modal',

        components: {
            CroudScheduleEditor,
        },

        model: {
            prop: 'schedule',
        },

        props: {
            /**
             * Scheduler Schema
             *
             * @ignore
            */
            schedule: {
                type: Object,
                required: true,
            },
        },

        data() {
            return {
                showModal: false,
            }
        },

        computed: {
            model: {
                get() {
                    return this.schedule
                },

                set(val) {
                    this.$emit('input', val)
                },
            },
        },

        methods: {
            closeModal() {
                $(this.$refs.schedulerModal.$el).modal('hide')
            },

            closed() {
                this.$emit('closed')
                this.showModal = false
            },
        },
    }
</script>

<style lang="scss" scoped>
    button.ui.mini.basic.blue.button {
        opacity: 1;
    }
</style>
