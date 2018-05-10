<template>
    <div class="collapsable-header" @click="_collapsed = !_collapsed">
        <div class="title">{{ title }}</div>
        <div class="caret">
            <croud-dropdown-indicator-button :collapsed="_collapsed"/>
        </div>
    </div>
</template>

<script>
    import CroudDropdownIndicatorButton from '../buttons/DropdownIndicatorButton'

    /**
    * A basic toggle header showing a collapsed or expanded state
    *
    * @example ./croud-toggle-header.md
    */
    export default {
        name: 'croud-toggle-header',

        components: {
            CroudDropdownIndicatorButton,
        },

        props: {
            /**
             * Set the title of the header
             */
            title: {
                type: String,
                default: 'Title',
            },

            /**
             * Collapsed prop - emits update:collapsed event compatible with prop.sync
             */
            collapsed: {
                type: Boolean,
                default: false,
            },
        },

        computed: {
            _collapsed: {
                get() {
                    return this.collapsed
                },
                set(val) {
                    this.$emit('update:collapsed', val)
                },
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import '../../../resources/sass/variables/_all.scss';

    .collapsable-header {
        height: 35px;
        display: flex;
        align-items: center;
        padding: 0 10px;

        font-size: $croud-font-size-medium;
        font-weight: 800;
        text-transform: capitalize;

        cursor: pointer;

        .title {
            flex-grow: 1;
        }

        .caret {
            color: $croud-colour-grey-dark;
            flex-grow: 0;
        }
    }
</style>
