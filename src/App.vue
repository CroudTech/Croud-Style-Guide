<template>
    <div>
        <keep-alive>
            <guide></guide>
        </keep-alive>
    </div>
</template>

<script>
import Vue from 'vue'

import Guide from './components/Guide'


export default {
    name: 'app',
    components: {
        Guide,
    },
    created() {
        Vue.http.options.root = `//${gateway_url}`
        Vue.http.headers.common.Authorization = `Bearer ${localStorage.getItem('jwt')}`
    },
}

</script>
