<template>
    <div>
        <div class="ui secondary basic segment">
            <div class="ui text menu">
                <div class="left item">
                    <div class="ui compact basic segment">
                        <strong>Search</strong>
                        <div class="ui text menu">
                            <div class="item">
                                <div class="ui icon input">
                                    <i class="search icon"></i>
                                    <input :placeholder="placeholder" v-model="_search"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right item">
                    <slot></slot>

                    <div v-if="$slots['advanced-filters']" class="item">
                        <div class="ui center aligned compact basic segment">
                            <div class="ui text menu">
                                <div class="item form">
                                    <croud-morph-button :active="1" :options="[{name: 'Advanced', method: toggleCollapse}, {name: 'Hide', method: toggleCollapse}]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <transition name="slide-down">
            <div v-if="!collapse" class="ui secondary basic segment">
                <slot name="advanced-filters"></slot>
            </div>
        </transition>
    </div>
</template>

<script>
    import CroudMorphButton from '../buttons/MorphButton'
    /**
     * Filter bar to be used above datagrids and other searchable/filterable data sets
     *
     * @example ./croud-filterbar.md
     */
    export default {
        name: 'croud-filterbar',

        components: {
            CroudMorphButton,
        },

        data() {
            return {
                collapse: true,
            }
        },

        props: {
           /**
            * Search input, emitting update:search event compatible with prop.sync
            */
            search: {
                type: String,
                default: '',
            },

           /**
            * Placeholder text
            */
            placeholder: {
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

        methods: {
            toggleCollapse() {
                this.collapse = !this.collapse
            },
        },
    }
</script>

<style lang="scss" scoped>
    .ui.secondary.basic.segment {
        padding: 0.5em 0 0;
        margin: 0;

        .item.left {
            padding: 0 1em 1em;
            margin: 0;

            .segment {
                padding: 0;
                margin: 0;
            }

            .ui.text.menu .item {
                margin: 0;
                padding: 0;
            }
        }

        .right.item {
            padding: 0;
            margin: 0;

            >.item {
                padding: 0 1em 1em;

                .segment {
                    padding: 0;
                    margin: 0;
                }
            }
        }
    }

    .slide-down-enter-active, .slide-down-leave-active {
        max-height: 1000px;
        transition: all .3s ease;
    }

    .slide-down-enter, .slide-down-leave-to {
        max-height: 0;
        opacity: 0;
        overflow-y: hidden;
    }
</style>
