<template>
    <button class="ui button" @click="morph()">{{nextOption.name}}</button>
</template>

<script>
/**
* @example ./croud-morph-button.md
*/

export default {
    name: 'croud-morph-button',
    data() {
        return {
            activeIndex: this.active,
        }
    },
    props: {
        /**
        * The two options to toggle between
        */
        options: {
            type: Array,
            required: true,
            validator(options) {
                return options.splice(2)
            },
        },
        /**
        * The active index when first rendered
        */
        active: {
            type: Number,
            default: 0,
        },
    },
    computed: {
        nextOption() {
            return this.options[1 - this.activeIndex]
        },
    },
    methods: {
        morph() {
            this.activeIndex = 1 - this.activeIndex
            this.options[this.activeIndex].method()
        },
    },
}
</script>

<style>

</style>
