<template>
    <div>
        <navigation></navigation>
        <router-view class="ui container"></router-view>
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
        ColourPalette,
        FilePath,
        Typewriter,
        fonts: Fonts,
        navigation: Navigation,
    },
}
</script>

<style class="scss" scoped>
    .ui.container{
        margin-top: 8rem!important;
        margin-left: 18rem!important;
        width: calc(100% - 21rem);
    }
</style>
