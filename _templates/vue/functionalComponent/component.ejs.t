---
to: src/components/shared/<%= dir %>/<%= name %>.vue
---
<%
 componentName = `croud-${h.inflection.transform(name, ['underscore', 'dasherize']).toLowerCase()}`
%>
<script>
    /**
    * <%= description %>
    *
    * *This is a functional component which has no state so does not need to define any props*
    * @see https://vuejs.org/v2/guide/render-function.html#Functional-Components
    *
    * @example ./<%= componentName %>.md
    */
    export default {
        functional: true,

        name: '<%= componentName %>',

        render(h) {
            return h('div', "<%= name %>")
        }
    }
</script>

<style scoped>

</style>

