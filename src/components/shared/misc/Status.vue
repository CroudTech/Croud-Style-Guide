<template>
    <div :class="classes">
        {{ status }}
    </div>
</template>

<script>
    /**
     * Status label for tasks and jobs
     *
     * @example ./croud-status.md
     */
    export default {
        name: 'croud-status',

        props: {
            /**
             * Job or task object
             */
            context: {
                type: Object,
                required: true,
            },
        },

        computed: {
            classes() {
                return ['ui', 'label', 'circular', 'basic', 'status-label', 'fluid', 'tiny', this.context.contextual_status.colour]
            },

            status() {
                return this.context.contextual_status.status.toUpperCase()
            },
        },
    }
</script>
