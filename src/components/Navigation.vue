<template lang="html">
    <div class="ui two item menu">
      <a id="colour" class="item" @click="goTo('colour')">Colour</a>
      <a id="typography" class="item" @click="goTo('typography')">Typography</a>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeId: 'colour',
        }
    },
    methods: {
        goTo(path) {
            this.$router.push(path)
            this.activeId = path
        },
    },
}
</script>

<style lang="css">
</style>
