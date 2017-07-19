<template>
    <button ref="options" class="ui dropdown icon pointing top circular button"
    :class="{left, right: !left, 'no-pointer': noPointer}">
        <i class="ellipsis vertical icon"></i>
        <div class="ui menu">
            <slot name="options">
                <template v-for="(option, index) in options" :key="index">
                    <template v-if="!option.method">
                        <div v-if="index > 0" class="divider"></div>
                        <div v-if="option.name" class="header">
                            <i v-if="option.icon" class="icon" :class="option.icon"></i>
                            {{ option.name }}
                        </div>
                    </template>
                    <div v-else
                        class="item"
                        :class="{ disabled: option.disabled}"
                        :key="option.name"
                        @click="option.method"
                    >
                        <i v-if="option.icon" class="icon" :class="option.icon"></i>
                        {{ option.name }}
                    </div>
                </template>
            </slot>
        </div>
    </button>
</template>

<script>
/**
* Overflow Menu component
* @example ./croud-overflow-menu.md
*/

export default {
    name: 'croud-overflow-menu',
    props: {
        /**
        * Menu item information
        */
        options: {
            type: Array,
            default: [],
        },
        /**
        * Align menu to left
        */
        left: {
            type: Boolean,
            default: false,
        },
        /**
        * Hide pointer in Dropdown
        */
        noPointer: {
            type: Boolean,
            default: false,
        },
    },
    mounted() {
        $(this.$refs.options).dropdown({
            transition: 'slide down',
            action: 'hide',
        })
    },
}
</script>

<style lang="scss" scoped>
    @import '../../../resources/sass/variables/_all.scss';

    .ui.dropdown{
        &.button{
            background: none;
            &.active.visible {
                &:hover{
                    background: none;
                }
            }

            &:focus{
                background: none!important;
            }

            .icon{
                font-size: $croud-font-size-large;
            }

            &.no-pointer{
                .menu{
                   &::after{
                        display: none;
                   }
                }
            }
            .menu{
                position: absolute;
                right:0;
                margin-top: -.3em !important;
                border-radius: 2px;
                box-shadow: 0 1px 2px .5px rgba($croud-colour-black, .4);
                border: none;
                min-width: 112px;
                padding: 8px 0;

               .divider {
                   margin: 0;
               }

                &::after{
                    box-shadow: none;
                    border-left: 1px solid rgba($croud-colour-black, .15);
                    border-top: 1px solid rgba($croud-colour-black,.15)
                }


                @media screen and (min-width: 450px){
                    min-width: 128px;
                    max-width: 156px;
                }
                .item{
                    display: flex;
                    align-items: center;
                    font-size: $croud-font-size-small;
                    border-radius: 0;
                    color: $croud-colour-grey-dark;
                    padding-left: 16px!important;
                    height: 48px;

                    .icon{
                        margin-left: -1em;
                        font-size: $croud-font-size-small;
                        opacity: .8;
                    }

                    @media screen and (min-width: 450px){
                        height: 40px;
                        padding-left: 24px!important;
                    }
                }
            }
        }
    }

</style>
