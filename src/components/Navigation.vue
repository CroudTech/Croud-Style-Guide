<template lang="html">
    <header class="header-sidebar ui sidebar vertical menu visible">
        <img class="logo" src="../../static/croud-logo.svg" @click="goHome()" />
        <nav>
            <template v-for="route in routes">
                <router-link tag="a" :to="{ name: route.children[0].name, params: {} }" class="item" active-class="active" exact>
                    {{route.title || route.name}}
                </router-link>
                <div v-show="catagoryOpen(route)" v-for="child in order(route.children)" class="submenu">
                    <router-link tag="a" :to="{ name: child.name, params: {} }" class="item" active-class="active">
                        {{child.name}}
                    </router-link>
                </div>
            </template>
        </nav>
        <div class="bottom-menu">
            <a href="https://croudsupport.github.io/Croud-Style-Guide/technical/"><button class="ui button mini basic yellow">Open Tech Docs</button></a>
        </div>
    </header>
</template>

<script>
import _ from 'lodash'

export default {
    data() {
        return {
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
            this.$router.push({ name: 'introduction-default' })
        },
        order(children) {
            return _.sortBy(children.slice(1), 'name')
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

        .submenu {

            .item {
                padding-left: 2.5em;
                font-weight: 300;
            }
        }

        .bottom-menu {
            position: absolute;
            bottom: 0;

            .ui.button {
                margin: .8rem;
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
