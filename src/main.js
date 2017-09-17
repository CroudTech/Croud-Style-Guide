// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import VueRouter from 'vue-router'
import Ripple from 'vue-ripple-directive'
import VueHighlightJS from 'vue-highlightjs'
import VueSemantic from 'croud-vue-semantic'
import VueFaker from 'vue-faker'
import VueQuill from 'vue-quill'
import 'quill/dist/quill.snow.css'
import router from './router'
import store from './store'
import App from './App'
import './../semantic/dist/semantic.css'
import './../semantic/dist/semantic'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueSemantic)
Vue.use(VueFaker)
Vue.use(VueQuill)

Vue.use(VueHighlightJS)
Vue.directive('ripple', Ripple)

router.afterEach(() => {
    window.scrollTo(0, 0)
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App />',
    components: { App },
    store,
    router,
})
