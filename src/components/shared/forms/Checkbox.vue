<template>
    <div class="checkbox">
        <input :name="name" type="checkbox" :checked="checker" />
        <label class="checkbox__box" @click="function() { checker=!checker; _checked = !_checked }">
            <i class="icon check"></i>
        </label>
  </div>
</template>

<script>
/**
 * Basic circular checkbox component
 * @example ./croud-checkbox.md
*/
export default {
    name: 'croud-checkbox',
    model: {
        prop: 'checked',
    },
    props: {
        /**
         * use to default to checked, alias for v-model
         */
        checked: {
            type: Boolean,
            default: false,
        },
        /**
         * name for checkbox
         */
        name: {
            type: String,
            default: '',
        },
    },

    computed: {
        checker: {
            get() {
                return this.checked
            },
            set(val) {
                this.$emit('input', val)
            },
        },

        _checked: {
            get() {
                return this.checked
            },
            set(val) {
                this.$emit('input', val)
            },
        },
    },
}
</script>

<style lang="scss" scoped>
    @import '../../../resources/sass/variables/all.scss';

    input[type=checkbox] {
        display: none;
    }

    .checkbox {
        height: 1.3em;
        width: 1.3em;
        font-size: $croud-font-size-medium;
        position: relative;
        display: inline-block;

        &::after {
            content: '';
            display: block;
            clear: both;
        }

        &__box {
            top: 0;
            left: 0;
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 100%;
            border-radius: 50%;
            border: .1em solid rgba(#8e979b, .7);
            box-sizing: border-box;
            transition: all $croud-motion-duration-slow $croud-motion-ease-sharp;

            &:hover{
                border-color: #8e979b;
            }

            .icon {
                color: $croud-colour-font-light;
                font-size: $croud-font-size-mini;
                line-height: 1.2;
                margin-right: 0;
                display: none;
            }
        }
}

.primary{

    &.checkbox input[type=checkbox]:checked + .checkbox__box{
        border-color: $croud-colour-primary;
        background-color: $croud-colour-primary;
    }
}

.success{

    &.checkbox input[type=checkbox]:checked + .checkbox__box{
        border-color: $croud-colour-success;
        background-color: $croud-colour-success;
    }
}

.checkbox input[type=checkbox]:checked + .checkbox__box{
    border-color: $croud-colour-info;
    background-color: $croud-colour-info;

   .check {
     display: inline;
   }
}
</style>
