
<script>
    import Save from './SaveButton'
    import DropdownButton from './DropdownButton'

    /**
    * Combination of Save Button atom and Dropdown Button atom to provide additional options to the Save Button
    *
    * *This is a functional component which has no state so does not need to define any props*
    * @see https://vuejs.org/v2/guide/render-function.html#Functional-Components
    * @see https://croudsupport.github.io/Croud-Style-Guide/technical/#!/croud-save-button
    * @see https://croudsupport.github.io/Croud-Style-Guide/technical/#!/croud-dropdown-button
    *
    * @example ./croud-save-button-with-dropdown.md
    */
    export default {
        functional: true,

        name: 'croud-save-button-with-dropdown',

        render(createElement, context) {
            return createElement('div',
                {
                    class: 'ui blue buttons',
                },
                [
                    createElement(Save, {
                        props: context.props,
                        on: context.listeners,
                    }),
                    createElement(DropdownButton, {
                        props: context.props,
                    }),
                ],
        )
        },
    }
</script>

<style scoped>

</style>

