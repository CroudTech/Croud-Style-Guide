<template>
    <div class="ui secondary basic segment">
        <div class="ui text menu">
            <slot name="left-item">
            <div v-if="showSearch" class="left item">
                <div class="ui icon input">
                    <i class="search icon"></i>
                    <input placeholder="Search..." v-model="_search"/>
                </div>
            </div>
            </slot>
            <div class="right item">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    /**
     * Filter bar to be used above datagrids and other searchable/filterable data sets
     *
     * @example ./croud-filterbar.md
     */
    export default {
        name: 'croud-filterbar',

        props: {
           /**
            * Search input, emitting update:search event compatible with prop.sync
            */
            search: {
                type: String,
                default: '',
            },

            /**
            * Show search
            */
            showSearch: {
                type: Boolean,
                default: true,
            },
        },

        computed: {
            _search: {
                get() {
                    return this.search
                },
                set(val) {
                    this.$emit('update:search', val)
                },
            },
        },
    }
</script>

<style>

</style>
