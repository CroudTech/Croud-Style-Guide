<template lang="html">
  <div>
    <path-line v-if="fileName" :file-name="fileName" />
    <p>{{introText}}</p> 
  </div>
</template>

<script>
import PathLine from './vars/PathLine'

export default {
    props: {
        introText: {
            type: String,
            required: true,
        },
        fileName: {
            type: String,
        },
    },
    components: {
        PathLine,
    },
}
</script>

<style lang="css">
</style>
