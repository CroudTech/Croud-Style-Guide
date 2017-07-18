<template>
    <div class="ui inverted dimmer" :class="{ active: loading }">
        <div class="ui text loader" :class="{ [size]: true }">
            <slot>
                Loading
            </slot>
        </div>
    </div>
</template>

<script>
   /**
    * A loading spinner combined with a dimmer
    *
    * @see https://semantic-ui.com/elements/loader.html
    * @example ./croud-loader.md
    */
    export default {
        name: 'croud-loader',

        props: {
           /**
            * Whether the loader is active or not
            */
            loading: {
                type: Boolean,
                required: true,
            },

           /**
            * Size of the loader
            * @see https://semantic-ui.com/elements/loader.html#size
            */
            size: {
                type: String,
                default: 'large',
            },
        },
    }
</script>
