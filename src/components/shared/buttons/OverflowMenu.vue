<template>
  <button ref="options" class="ui dropdown icon pointing top left circular basic button">
    <i class="ellipsis vertical icon"></i>
    <div class="ui menu">
        <slot name="options">
            <div
                v-for="option in options"
                class="item"
                :class="{disabled: option.disabled}"
                :key="option.name"
                @click="option.method"
            >
                <i v-if="option.icon" class="icon" :class="option.icon"></i>
                {{ option.name }}
            </div>
        </slot>
    </div>
  </button>
</template>

<script>
export default {
    props: {
        options: {
            type: Array,
            default: [],
        },
    },

    mounted() {
        $(this.$refs.options).dropdown()
    },
}
</script>
