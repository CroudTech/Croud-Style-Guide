<template>
    <section class="catagory">
        <header class="catagory__heading">
            <h1 class="catagory__title">{{catagory}}</h1>
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
}
</script>

<style lang="scss">
    @import '../resources/sass/variables/_all.scss';
    .catagory{
        &__heading{
            position: fixed;
            background-color: $croud-colour-white;
            width: 100%;
            z-index: 100;
            top:0;
            left: 15rem;
        }
        &__title{
            font-size: $croud-font-size-huge;
            font-family: $croud-font-body;
            text-transform: uppercase;
            padding: 3rem 1em;
            color: rgba($croud-colour-black, .3);
        }
    }
</style>
