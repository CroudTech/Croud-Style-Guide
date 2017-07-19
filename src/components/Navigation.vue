<template lang="html">
    <header class="header-sidebar ui sidebar vertical menu visible">
        <img class="logo" src="../../static/croud-logo.svg" @click="goHome()" />
        <nav>
            <template v-for="route in routes">
                <router-link tag="a" :to="{ name: route.children[0].name, params: {} }" class="item" active-class="active" exact>
                    {{route.name}}
                </router-link>
                <div v-show="catagoryOpen(route)" v-for="(child, index) in route.children" class="submenu">
                    <router-link v-if="index > 0" tag="a" :to="{ name: child.name, params: {} }" class="item" active-class="active">
                        {{child.name}}
                    </router-link>  
                </div>
            </template>
        </nav>
    </header>
</template>

<script>
export default {
    data() {
        return {
            activeId: 'colour',
            routes: this.$router.options.routes,
        }
    },
    methods: {
        catagoryOpen(route) {
            const currentCatagory = this.$route.path.split('/')[1]
            const routeCatagory = route.path.split('/')[1]

            return currentCatagory === routeCatagory
        },
        goHome() {
            this.$router.push({ name: 'introduction' })
        },
    },
}
</script>

<style lang="scss" scoped>
    @import '../resources/sass/variables/all.scss';

    .ui.sidebar.menu {
        background-color: $croud-colour-header;

        .item {
            color: $croud-colour-white;
            font-size: $croud-font-size-small;
            text-transform: capitalize;

            &.active {
                &:hover {
                    color: $croud-colour-grey;
                }
            }
        }

        .submenu{
            .item {
                padding-left: 2.5em;
                font-weight: 300;
            }
        }
    }

    .logo {
        width: 55%;
        display: block;
        margin: 0 auto;
        cursor: pointer;
    }
</style>
