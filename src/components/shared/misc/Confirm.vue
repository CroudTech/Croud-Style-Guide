<template>
  <semantic-modal :active="active" @close-modal="resolution(false)" size="small" :settings="{content_classes: {content: true}, closeable: true, closeable_button: true}">
        <div class="ui center aligned basic segment">
            <div v-html="content"></div>
        </div>
        <div v-if="active" class="ui center aligned basic segment">
            <button class="ui small button" @click="resolution(false)">{{config.cancelText}}</button>
            <button class="ui small yellow button" @click="resolution">{{config.confirmText}}</button>
        </div>
  </semantic-modal>
</template>

<script>
    /**
     * Confirmation modal
     * @example ./croud-confirm.md
     */
    export default {
        name: 'croud-confirm',

        data() {
            return {
                content: '',
                active: false,
                config: {
                    confirmText: 'Confirm',
                    cancelText: 'Cancel',
                },
                resolve() {},
                reject() {},
            }
        },

        methods: {
            /**
             * Show the confirmation modal and handle response by resolving or rejecting a promise
             *
             * @public
             * @param content confirmation text
             * @return Promise
             */
            confirm(content, configObj) {
                this.active = true
                this.content = content
                this.config = Object.assign(this.config, configObj)
    
                return new Promise((resolve, reject) => {
                    this.resolve = resolve
                    this.reject = reject
                })
            },

            resolution(accept = true) {
                this.active = false

                if (accept) return this.resolve()
                return this.reject()
            },
        },
    }
</script>
