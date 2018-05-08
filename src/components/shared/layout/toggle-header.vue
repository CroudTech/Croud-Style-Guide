<template>
    <div :class="['category-header', { pointer: showCollapseToggle }]" @click="toggle">
        <div class="title">{{ title }}</div>
        <div v-if="showCollapseToggle" class="carret">
            <i v-if="collapse" class="large angle right icon"></i>
            <i v-else class="large angle down icon"></i>
        </div>
    </div>
</template>

<script>
    /**
    * A collapsable header component
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
             * Allow/show collapse/open toggle
             */
            showCollapseToggle: {
                type: Boolean,
                default: true,
            },
        },

        data() {
            return {
                collapse: true,
            }
        },

        methods: {
            toggle() {
                if (!this.showCollapseToggle) return
                this.collapse = !this.collapse
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import '../../../resources/sass/variables/_all.scss';

    $border-size: 1px;
    $border-colour: $croud-colour-grey-lighter;

    .category-header {
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

        .title {
            width: 90%;
            text-align: left;
        }

        .carret {
            color: $croud-colour-grey-dark;
            width: 10%;
            text-align: right;
        }
    }

    .pointer {
        cursor: pointer;
    }
</style>
