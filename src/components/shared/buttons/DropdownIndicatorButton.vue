
<script>
    import CroudDropdownIcon from '../icons/ArrowIcon'
    /**
    * Atomic button that is used to show or hide content
    *
    * *This is a functional component which has no state so does not need to define any props*
    * @see https://vuejs.org/v2/guide/render-function.html#Functional-Components
    *
    * @example ./croud-dropdown-indicator-button.md
    */
    export default {
        functional: true,

        name: 'croud-dropdown-indicator-button',

        render(h, context) {
            return h(CroudDropdownIcon, {
                props: {
                    direction: context.props.collapsed ? 'right' : 'down',
                },
                on: context.listeners,
            })
        },
    }
</script>

<style scoped>

</style>

