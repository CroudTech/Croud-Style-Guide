<template>
    <section class="catagory">
        <header class="catagory__heading">
            <h1 class="catagory__title">{{catagory}}</h1>
            <h2 v-show="subCatLevel" class="catagory__page">{{name}}</h2>
        </header>
        <main>
            <router-view></router-view>
        </main>
    </section>
</template>

<script>
export default {
    props: {
        catagory: {
            type: String,
            required: true,
        },
    },
    computed: {
        subCatLevel() {
            return this.$route.path.split('/')[2]
        },
        name() {
            return this.$route.name
        },
    },
}
</script>

<style lang="scss">
    @import '../resources/sass/variables/_all.scss';
    .catagory{
        &__title{
            font-size: 48px;
            font-weight: normal;
            margin: 0 0 8px 0;
            color: #333;
        }

        &__page{
            font-size: 36px;
            font-weight: normal;
            margin: 0;
            color: #333;
        }
    }
</style>
