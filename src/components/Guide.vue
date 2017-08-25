<template>
    <div>
        <navigation></navigation>
        <main class="ui container">
            <router-view class="main"></router-view>
        </main>
    </div>
</template>

<script>
import Navigation from './Navigation'

export default {
    name: 'Guide',
    components: {
        navigation: Navigation,
    },
}
</script>

<style class="scss" scoped>
    .ui.container{
        margin-left: 15rem!important;
        width: calc(100% - 15rem);
    }

    .main {
        margin: 28px 32px;
    }
</style>
