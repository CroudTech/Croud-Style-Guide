
<script>
    /**
    * Standard arrow icon to use in Croud Control
    *
    * *This is a functional component which has no state so does not need to define any props*
    * @see https://vuejs.org/v2/guide/render-function.html#Functional-Components
    *
    * @example ./croud-arrow-icon.md
    */
    export default {
        functional: true,

        name: 'croud-arrow-icon',

        render(h, context) {
            console.log(context)
            return h('i', {
                class: {
                    chevron: true,
                    icon: true,
                    [context.props.direction || 'right']: true,
                    ...context.data.class || {},
                },
            })
        },
    }
</script>

