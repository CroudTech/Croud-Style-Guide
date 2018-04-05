---
to: src/components/shared/<%= dir %>/<%= name %>.vue
---
<%
 componentName = `croud-${h.inflection.transform(name, ['underscore', 'dasherize']).toLowerCase()}`
%>
<template>
    <div><%= name %></div>
</template>

<script>
    /**
    * <%= description %>
    *
    * @example ./<%= componentName %>.md
    */
    export default {
        name: '<%= componentName %>',
    }
</script>

<style scoped>

</style>

