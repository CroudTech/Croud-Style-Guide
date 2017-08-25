<template>
    <div>
        <keep-alive>
            <guide></guide>
        </keep-alive>
    </div>
</template>

<script>
import Guide from './components/Guide'

export default {
    name: 'app',
    components: {
        Guide,
    },
}

</script>

<style lang="scss">
    @import './resources/sass/variables/colours.scss';
    body {
        background-color: $croud-colour-white;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    }
</style>
