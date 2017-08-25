<template>
    <div ref="example" class="example" :data-clipboard-text="varName" v-ripple>
        <slot></slot>
    </div>
</template>

<script>
import Clipboard from 'clipboard'

export default {
    data() {
        return {
            clipboard: undefined,
        }
    },
    props: {
        varName: {
            type: String,
        },
    },
    mounted() {
        this.clipboard = new Clipboard(this.$refs.example)
    },
}
</script>

<style lang="scss">
    .example {
        cursor: pointer;
    }
</style>
