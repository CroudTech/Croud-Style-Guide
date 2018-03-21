<template>
    <button v-if="isSupported" ref="button" :data-clipboard-text="text" :class="buttonClasses" :data-tooltip="tooltipText" data-inverted>
        Copy
    </button>
</template>

<script>
    import Clipboard from 'clipboard'

    /**
     * A button to add text to the clipboard, this button will only show if the browser supports this functionality
     *
     * @see https://clipboardjs.com/
     * @example ./croud-copy-button.md
     */
    export default {
        name: 'croud-copy-button',

        props: {
            /**
             * Text to copy to clipboard
             */
            text: {
                required: true,
                type: String,
            },

            /**
             * Overide button classes
             */
            buttonClasses: {
                type: String,
                default: 'ui basic button copy-button',
            },

            /**
             * Overide tooltip message
             */
            tooltipText: {
                type: String,
                default: 'Copy to clipboard',
            },
        },

        data() {
            return {
                clipboard: null,
            }
        },

        mounted() {
            if (!this.isSupported) return

            this.clipboard = new Clipboard(this.$refs.button)

            this.clipboard.on('success', (e) => {
                this.$emit('success', e)
            })

            this.clipboard.on('error', (e) => {
                this.$emit('error', e)
            })
        },

        computed: {
            isSupported() {
                return Clipboard.isSupported()
            },

        },
    }
</script>
