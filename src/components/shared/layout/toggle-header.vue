<template>
    <div class="collapsable-header" @click="_collapsed = !_collapsed">
        <div class="title">{{ title }}</div>
        <div class="caret">
            <i v-if="_collapsed" class="large angle right icon"></i>
            <i v-else class="large angle down icon"></i>
        </div>
    </div>
</template>

<script>
    /**
    * A basic toggle header showing a collapsed or expanded state
    *
    * @example ./croud-toggle-header.md
    */
    export default {
        name: 'croud-toggle-header',

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

    $border-size: 1px;
    $border-colour: $croud-colour-grey-lighter;

    .collapsable-header {
        display: flex;
        align-items: center;
        height: 35px;
        width: 100%;
        border: solid $border-size $border-colour;
        padding: 0 10px;

        font-family: $croud-font-body;
        color: $croud-colour-black;
        font-size: $croud-font-size-large;
        font-weight: 800;
        text-transform: capitalize;

        cursor: pointer;

        .title {
            width: 90%;
            text-align: left;
        }

        .caret {
            color: $croud-colour-grey-dark;
            width: 10%;
            text-align: right;
        }
    }
</style>
