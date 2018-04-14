
<template>
    <div class="ui floating dropdown icon button" ref="dropdown" :class="{disabled: loading}">
        <i class="dropdown icon" ></i>
        <div class="menu">
            <div v-for="item in menu" class="item" @click="item.action" :key="item.title">{{ item.title }}</div>
        </div>
    </div>
</template>

<script>
    /**
    * Dropdown button atom that is designed to be used in a group of buttons to add more options to the main button
    *
    * @example ./croud-dropdown-button.md
    */
    export default {
        name: 'croud-dropdown-button',

        props: {
            /*
            * Array of menu item objects in the format {title: foo, action() {console.log()}}
            */
            menu: {
                type: Array,
                default: () => [],
            },

            /*
            * Loading flag to disable element
            */
            loading: {
                type: Boolean,
                default: false,
            },
        },

        mounted() {
            $(this.$refs.dropdown).dropdown({
                action: 'hide',
            })
        },
    }
</script>

<style scoped>

</style>

