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
    }
</style>
