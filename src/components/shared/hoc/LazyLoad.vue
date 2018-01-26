<template>
  <div v-if="outOfView" class="placeholder">&nbsp;</div>
  <div v-else>
    <slot></slot>
  </div>
</template>

<script>
    /**
     * Lazy load any child content when this hoc comes into view
     *
     * @example ./lazy-load.md
     */
    export default {
        name: 'lazy-load',

        props: {
            options: {
                type: Object,
                default() {
                    return {}
                },
            },
        },

        data() {
            return {
                outOfView: true,
            }
        },

        mounted() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.intersectionRatio > 0) {
                        this.outOfView = false
                        observer.disconnect()
                    }
                })
            }, this.options)

            observer.observe(this.$el)
        },
    }
</script>

<style scoped>
    .placeholder {
        min-height: 10px;
    }
</style>
