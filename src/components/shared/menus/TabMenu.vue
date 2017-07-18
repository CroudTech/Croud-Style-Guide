<template>
    <div class="ui menu">
        <div v-for="item in menuItems" class="yellow item" :class="{active: localActive === item.component}" @click="localActive = item.component" v-html="item.name"></div>
    </div>
</template>

<script>
    
    /**
    * Basic tabular menu component
    * @example ./croud-tab-menu.md
    */

    export default {
        name: 'croud-tab-menu',

        model: {
            prop: 'active',
        },

        props: {
            /**
            * State which tab is active. (by name of menu item)
            */
            active: {
                required: true,
            },
            /**
            * Menu items to be displayed on tab menu.
            */
            menuItems: {
                required: true,
                type: Array,
            },
        },

        computed: {
            localActive: {
                get() {
                    return this.active
                },
                set(val) {
                    this.$emit('input', val)
                },
            },
        },
    }
</script>

<style scoped>
    .pointing {
        cursor: pointer;
    }
</style>
