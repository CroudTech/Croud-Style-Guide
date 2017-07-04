<template lang="html">
    <div :id="this.colour" class="colour-swatch" v-ripple>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    props: {
        colour: {
            type: String,
            required: true,
        },
    },
    computed: {
        ColourValue() {
            const element = document.getElementById(this.colour)
            const colourVal = window.getComputedStyle(element, '::before').getPropertyValue('content')
            return colourVal
        },
    },
}
</script>

<style lang="scss">
@import "../resources/sass/variables/colours.scss";
@import "../resources/sass/functions/colours.scss";
@import "../resources/sass/variables/fonts.scss";
@import "../resources/coloursMap.scss";

@each $rootKey, $arr in $coloursMap {
    @each $key, $val in $arr {
        .colour-swatch.#{$rootKey}.#{$key} {
            color: croud-colour-contrast($val);
            background-color: $val;
            &.colour-swatch{
                &__hex:after {
                    content: "#{$val}"
                }
            }
            &::before {
                position: absolute;
                font-size: 1.5em;
                top: 40%;
                right: 0.5em;
                display: none;
                -webkit-transition: all 3s;
                content: "#{$val}";
            }
            &::after {
                position: absolute;
                font-weight: 300;
                bottom: .5em;
                right: .5em;
                content: "#{$key}";
            }

            &:hover::before {
                display: inline-block;
                margin: auto;
                text-align: right;
            }
        }
    }
}

.colour-swatch {
    position: relative;
    text-align: right;
    padding: .5em;
    bottom: 0;
    box-shadow: 0 2px 5px rgba($croud-colour-black, .3);
    width: 100%;
    min-height: 80px;
    margin: .5em 0;
    transition: all .2s ease-in-out;

    &:hover{
        min-height: 100px;
    }
}


</style>
