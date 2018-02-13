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
                const classNames = ['ui', 'label', 'circular', 'status-label', 'fluid', 'tiny']

                if (this.context.status === 'deleted' || this.context.deleted_at) {
                    classNames.push('red')
                } else {
                    switch (this.context.status) {
                    case 'new':
                        classNames.push('grey')
                        break
                    case 'open':
                        classNames.push('grey')
                        break
                    case 'in_progress':
                        classNames.push(this.context.qa ? 'blue' : 'yellow')
                        break
                    case 'approval':
                        classNames.push('blue')
                        break
                    case 'complete':
                        classNames.push('green')
                        break
                    default:
                        classNames.push('grey')
                        break
                    }
                }

                return classNames
            },

            status() {
                let status = this.context.status

                if (this.context.deleted_at) {
                    status = 'Cancelled'
                }

                switch (status) {
                case 'in_progress':
                    status = this.context.qa ? 'qa_task' : status
                    break
                case 'deleted':
                    status = 'Cancelled'
                    break
                default:
                    break
                }

                return status.replace('_', ' ').toUpperCase()
            },
        },
    }
</script>
