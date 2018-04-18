<script>
    /**
    * Our opinionated save button with loading and disabled state.
    *
    * *This is a functional component which has no state so does not need to define any props*
    * @see https://vuejs.org/v2/guide/render-function.html#Functional-Components
    *
    * @example ./croud-save-button.md
    */
    export default {
        functional: true,
        name: 'croud-save-button',
        render(h, context) {
            return h('button', {
                class: {
                    ui: true,
                    blue: true,
                    button: true,
                    loading: context.props.loading,
                },
                attrs: {
                    disabled: context.props.loading || context.props.disabled,
                },
                on: context.listeners,
            }, 'Save')
        },
    }
</script>
