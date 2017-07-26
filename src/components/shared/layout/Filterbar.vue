<template>
    <div class="ui secondary basic segment">
        <div class="ui text menu">
            <div class="item">
                <div class="ui icon input">
                    <i class="search icon"></i>
                    <input  placeholder="Search..." v-model="_search"/>
                </div>
            </div>
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
