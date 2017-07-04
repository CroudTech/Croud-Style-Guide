// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
// import CroudLayout from 'croud-layout'
import VueRouter from 'vue-router'
import Ripple from 'vue-ripple-directive'
import VueClipboard from 'vue-clipboard'
import VueHighlightJS from 'vue-highlightjs'
import 'quill/dist/quill.snow.css'
import router from './router'
import store from './store'
import App from './App'
import './../semantic/dist/semantic.css'
import './../semantic/dist/semantic'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(require('croud-vue-semantic'))
Vue.use(require('vue-resource'))
Vue.use(require('vue-semantic-showcase'))
Vue.use(require('vue-faker'))
Vue.use(require('vue-quill'))

Vue.use(VueHighlightJS)
Vue.use(VueClipboard)
Vue.directive('ripple', Ripple)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App />',
    components: { App },
    store,
    router,
})
