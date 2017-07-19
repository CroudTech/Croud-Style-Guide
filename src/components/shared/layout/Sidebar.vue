<template>
    <transition name="slide-fade">
        <div id="universal-editor" class="ui segments" @keydown.esc="close" @keydown.83.meta.prevent="save" @keydown.83.ctrl.prevent="save">
            <slot name="topbar">
                <div ref="topbar" class="ui basic secondary right aligned segment">
                    <slot name="options"></slot>
                    <button @click="close" class="ui basic blue mini button">
                        Cancel
                    </button>
                    <button @click="save" class="ui blue mini button">
                        Save
                    </button>
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
                $(this.$refs.topbar).children('.ui.dropdown').dropdown()
            })
        },
    }
</script>

<style scoped>
    #universal-editor {
        z-index: 50;
        margin: 0;
        background: #fff;
        position: absolute;
        position: fixed;
        top: 58px;
        right: 0;
        bottom: -1px;
        width: 700px;
        overflow-y: auto;
        border-left: 1px solid hsla(0,0%,39%,0);
        box-shadow: 0 10px 30px rgba(0,0,0,.6);
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

    #universal-editor .wrapper {
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        flex: 1 auto;
    }

    .slide-fade-enter-active {
        transition: all .35s ease;
    }
    .slide-fade-leave-active {
        transition: all .25s ease;
    }
    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateX(700px);
        opacity: .5;
    }

    .background {
        z-index: 40;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        opacity: 0.3;
        background-color: #000;
        content: '';
    }

</style>
