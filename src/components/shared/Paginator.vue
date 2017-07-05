<template>
    <h1>{{ test }}</h1>
</template>

<script>
    /**
     * This is the croud paginator.
     * @example ./croud-paginator.md
     */
    export default {
        name: 'croud-paginator',

        props: {
            /**
             * The color for the button.
             */
            test: {
                type: String,
                default: 'test',
            },
        },
    }
</script>
