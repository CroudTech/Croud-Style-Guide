<template lang="html">
    <div class="ui two item menu">
    <router-link tag="a" :to="{ name: 'colour', params: {} }" class="item" active-class="active">
        Colour
    </router-link>

    <router-link tag="a" :to="{ name: 'typography', params: {} }" class="item" active-class="active">
        Typography
    </router-link>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeId: 'colour',
        }
    },
}
</script>

<style lang="css">
</style>
