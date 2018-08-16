<template>
    <transition name="slide">
        <div id="universal-editor" class="ui segments universal-editor" @keydown.esc="close" @keydown.83.meta.prevent="save" @keydown.83.ctrl.prevent="save">
            <slot name="topbar">
                <div ref="topbar" class="ui basic secondary segment top-bar">
                    <h2 class="ui left aligned header sidebar-title">{{ title }}</h2>
                    <div class="right">
                        <slot name="actions">
                            <button @click="close" class="ui basic blue mini button">
                                Cancel
                            </button>
                            <button @click="save" class="ui blue mini button">
                                Save
                            </button>
                        </slot>
                        <slot name="options"></slot>
                    </div>
                </div>
            </slot>
            <div ref="wrapper" class="wrapper">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script>
    /**
     * Slide out edit component, fits snuggly in the standard croud-layout
     *
     * @example ./croud-sidebar.md
     */
    export default {
        name: 'croud-sidebar',

        props: {
            /**
             * Set the large title in the top left of the Sidebar
             */
            title: {
                type: String,
                default: '',
            },
        },

        methods: {
            close() {
                this.$emit('close')
            },
            save() {
                this.$emit('save')
            },
        },

        mounted() {
            this.$nextTick(() => {
                if (this.$el.querySelector('input')) {
                    this.$el.querySelector('input').focus()
                }
                $(this.$refs.wrapper).children('.menu').children('.item').tab()
            })
        },
    }
</script>

<style lang="scss" scoped>
    @import '../../../resources/sass/variables/_all.scss';

    $collapsed-cc-menu-width: 55px;

    .ui.segments.universal-editor {
        z-index: $croud-layer-8;
        margin: 0;
        background: $croud-colour-card;
        position: fixed;
        top: 58px;
        right: 0;
        bottom: -1px;
        width: 700px;
        overflow-y: auto;
        border-left: 1px solid hsla(0,0%,39%,0);
        box-shadow: $croud-box-shadow-float;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
        -webkit-flex-direction: column;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        border-radius: 0;
    }

    .universal-editor .wrapper {
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        flex: 1 auto;
    }

    .slide-enter-active {
        transition: all $croud-motion-duration-normal $croud-motion-ease-deceleration;
    }

    .slide-leave-active {
        transition: all $croud-motion-duration-normal $croud-motion-ease-sharp;
    }

    .slide-enter, .slide-leave-to {
        transform: translateX(700px);
    }

    .background {
        z-index: $croud-layer-3;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        opacity: 0.3;
        background-color: $croud-colour-header;
        content: '';
    }

    .top-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .right {
        white-space: nowrap;
    }

    .ui.header.sidebar-title {
        margin: 0.2em 1em 0 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .ui.segments:not(.horizontal){

        .segment:first-child {
            border-radius: 0;
        }
    }

    @media (max-width: 768px) {

        .ui.segments.universal-editor.responsive {
            width: calc(100vw - #{$collapsed-cc-menu-width});
        }

    }
</style>
