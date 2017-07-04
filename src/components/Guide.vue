<template>
    <div class="ui container">
        <navigation></navigation>
        <router-view></router-view>
    </div>
</template>

<script>
import Navigation from './Navigation'
import ColourPalette from './ColourPalette'
import FilePath from './FilePath'
import Typewriter from './Typewriter'
import Fonts from './Fonts'

export default {
    name: 'Guide',
    components: {
        'colour-palette': ColourPalette,
        'file-path': FilePath,
        typewriter: Typewriter,
        fonts: Fonts,
        navigation: Navigation,
    },
    data() {
        return {
        }
    },
    methods: {
    },
    computed: {
    },
    watch: {
    },
}
</script>

<style scoped>
.logo {
  width: 50%;
  margin-left: 25%;
  margin-right: 25%;
  margin-top: 5%;
  margin-bottom: 5%;
}
</style>
