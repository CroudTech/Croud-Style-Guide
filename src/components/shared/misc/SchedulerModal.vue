<template>
    <span>
        <button class="ui mini basic blue button" title="Edit schedule" @click="showModal = true">
            Edit
        </button>
        <semantic-modal title="Recurring Journal Schedule" :active="showModal" :settings="{content_classes: {content: true}, closeable: true, closeable_button: true}" @close-modal="closeModal">
            <croud-schedule-editor v-if="showModal" v-model="model" @scheduleSet="scheduleSet"/>
        </semantic-modal>
    </span>
</template>

<script>
    import CroudScheduleEditor from './ScheduleEditor'

    export default {
        components: {
            CroudScheduleEditor,
        },

        model: {
            prop: 'rootObject',
        },

        props: {
            /**
             * Root object for scheduler schema
             *
            */
            rootObject: {
                required: false,
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
                    return this.rootObject
                },

                set(val) {
                    this.$emit('input', val)
                },
            },
        },

        methods: {
            scheduleSet(schedule) {
                this.$emit('scheduleSet', schedule)
                this.closeModal()
            },

            closeModal() {
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
