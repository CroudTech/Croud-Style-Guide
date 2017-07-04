<template lang="html">
  <p class="code-block" v-highlightjs>
      <code class="scss">
          <slot></slot>
      </code>
  </p>
</template>

<script>
export default {
}
</script>

<style lang="scss">
@import './../../node_modules/highlight.js/styles/mono-blue.css'
</style>
