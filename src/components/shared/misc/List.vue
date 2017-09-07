<template>
    <div class="universal-list" ref="universalList" :class="dropdownClasses">
        <span class="text">{{ buttonText }}</span>

        <div class="menu">
            <slot name="custom-header">
                <div v-if="showHeader && $slots['header-action']" class="header-action">
                    <slot name="header-action"></slot>
                </div>

                <div v-if="showHeader" class="header">
                    
                    <slot name="header-item">
                        <div class="item">
                            {{ getHeaderItem.name }}
                        </div>
                    </slot>

                    <div v-if="!getHeaderItem.name" class="item">
                        <slot name="default-header-item">
                            Select an item
                        </slot>
                    </div>
                </div>
            </slot>
            
            <div v-if="showHeader" class="divider"></div>
        
            <slot name="extra-items">
            </slot>

            <div class="scrolling menu">
                <div v-for="item in list" :key="item.id" class="item" @click="$emit('item-selected', item)">
                    <slot name="items" :item="item">
                        {{ item.name }}
                    </slot>
                </div>
                    
                <div v-if="!list.length" class="item">
                    <slot name="list-empty">
                        No items to display
                    </slot>
                </div>
            </div>

            <croud-loader :loading="loading">{{ loadingText }}</croud-loader>
        </div>
    </div>
</template>

<script>
    import CroudLoader from './Loader'

    /**
    * An universal list dropdown component
    *
    * @example ./croud-list-dropdown.md
    */

    export default {
        name: 'croud-list-dropdown',

        components: { CroudLoader },

        props: {
            /**
            * Show loader in menu
            */
            loading: {
                type: Boolean,
                default: false,
            },

            /**
            * Customize the loading text
            */
            loadingText: {
                type: String,
                default: 'Loading',
            },

            /**
            * Show header
            */
            showHeader: {
                type: Boolean,
                default: true,
            },

            /**
            * Header item can show the currently selected item, just pass it to this prop
            */
            headerItem: {
                type: Object,
                default() {
                    return {}
                },
            },

            /**
            * Pass the getter as a string, or data array for your list in this prop
            */
            listGetter: {
                type: [Object, String],
                default() {
                    return []
                },
            },

            /**
            * Dropdown classes
            */
            dropdownClasses: {
                type: String,
                default: 'ui left top floating pointing dropdown tiny positive button',
            },

            /**
            * Text shown in the dropdown button
            */
            buttonText: {
                type: String,
                default() {
                    return 'Switch'
                },
            },

            /**
            * Semantic-ui dropdown overides
            */
            dropdownSettings: {
                type: Object,
                default() {
                    return {
                        forceSelection: false,
                        action: 'select',
                    }
                },
            },
        },

        methods: {
            buildDropdown() {
                $(this.$refs.universalList).dropdown(this.dropdownSettings)
            },
        },

        computed: {
            list() {
                if (typeof this.listGetter === 'string') return this.$store.getters[this.listGetter]
                return this.listGetter || []
            },

            getHeaderItem() {
                return this.headerItem || {}
            },

            iconSpecifed() {
                return this.buttonIcon.length
            },
        },

        mounted() {
            this.buildDropdown()
        },
    }

</script>

<style lang="scss" scoped>

 @import '../../../resources/sass/variables/_all.scss';
    
    .universal-list {

        * {
            vertical-align: middle;
        }

        .scrolling .item {
            border-bottom: 1px solid rgba(34,36,38,.05);
        }

        .item {
            padding: 0 40px 0 0;
            min-width: 280px
        }

        .header {
            min-width: 280px;
            min-height:35px;
            padding: 0;

            .item.selected {
                background: $croud-colour-white;
            }
        }
    }

    .ui.dropdown .menu > .header {
        font-size: $croud-font-size-medium;
    }

    .item .label,
    .header .label {
        margin-left:35px;
        margin-right:130px;
        padding-top: 8px;
    }

    .item .label {
        margin-top:0;
        padding-top: 6px;
    }

    .header-action {
        position: absolute;
        z-index: $croud-layer-2;
        right: 10px;
        top: 12px;
    }

    .ui.floating.dropdown .menu {
        border-top: none;

        .divider{
            margin: .5em 0 0;
        }
}
</style>
