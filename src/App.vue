<template>
    <div>
        <keep-alive>
            <hello></hello>
        </keep-alive>
    </div>
</template>

<script>
import Vue from 'vue'

import Hello from './components/Hello'

export default {
    name: 'app',
    components: {
        Hello,
    },
    created() {
        Vue.http.options.root = `//${gateway_url}`
        Vue.http.headers.common.Authorization = `Bearer ${localStorage.getItem('jwt')}`
    },
}

</script>
