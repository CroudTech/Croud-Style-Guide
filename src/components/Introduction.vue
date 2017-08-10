<template lang="html">
  <div>
    <p>{{introText}}</p>
  </div>
</template>

<script>
export default {
    props: {
        introText: {
            type: String,
            required: true,
        },
    },
}
</script>

<style lang="css">
</style>
