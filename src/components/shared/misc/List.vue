<template>
    <div class="switcher">
        <div v-if="showList" ref="universalList" :class="dropdownClasses">
            <span class="text">{{ buttonText }}</span>
            <i v-if="showIcon" class="icon" :class="buttonIcon"></i>

            <div class="menu">
                <slot name="custom-header">
                    <div v-if="showHeader && showHeaderAction" class="header-action">
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

                <div class="ui inverted dimmer" :class="{active: loading}">
                    <div class="ui text large loader">{{ loadingText }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /**
    * An universal list dropdown component
    *
    * @example ./croud-list-dropdown.md
    */

    export default {
        name: 'croud-list-dropdown',

        props: {
            /**
            * Show universalListDropdown
            */
            showList: {
                type: Boolean,
                default: true,
            },

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
            * Show header action
            */
            showHeaderAction: {
                type: Boolean,
                default: false,
            },

            /**
            * Header item can show the currently selected item, just pass it to this prop
            */
            headerItem: {
                default() {
                    return {}
                },
            },

            /**
            * Pass the getter for your list in this prop
            */
            listGetter: {
                default() {
                    return []
                },
            },

            /**
            * Semantic-ui dropdown overides
            */
            dropdownSettings: {
                default() {
                    return {
                        forceSelection: false,
                        action: 'select',
                    }
                },
            },

            /**
            * Dropdown classes
            */
            dropdownClasses: {
                default: 'ui floating top right pointing dropdown tiny positive button right floated',
            },

            /**
            * Show icon in dropdown button
            */
            showIcon: {
                default() {
                    return false
                },
            },

            /**
            * Text shown in the dropdown button
            */
            buttonText: {
                default() {
                    return 'Switch'
                },
            },

            /**
            * Icon displayed in the dropdown button (requires 'icon' adding to dropdown classes)
            */
            buttonIcon: {
                default() {
                    return ''
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
                return this.listGetter || []
            },

            getHeaderItem() {
                return this.headerItem || {}
            },
        },

        mounted() {
            this.buildDropdown()
        },

        watch: {
            showSwitcher(val) {
                if (!val) return

                this.$nextTick(() => {
                    this.buildDropdown()
                })
            },
        },
    }

</script>

<style lang="scss" scoped>

 @import '../../../resources/sass/variables/_all.scss';
    
    .switcher {
        display:block;
        height:40px;
        right:10px;
        margin-top: 5px;

        * {
            vertical-align: middle;
        }

        .switcher .scrolling .item {
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

            .ui.avatar {
                margin: 0 1.1em 0 -3px !important;
                display: inline-block;
                width: 2em;
                height: 2em;
                border-radius: 500rem;
                font-size: $croud-font-size-medium;
            }

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
        padding-top: 8px !important;
    }

    .item .label {
        margin-top:0;
        padding-top: 6px !important;
    }

    .header-action {
        position: absolute;
        z-index: $croud-layer-2;
        right: 10px;
        top: 12px;
    }

    .avatar {
        position:absolute;
    }

</style>
