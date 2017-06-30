// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import CroudLayout from 'croud-layout'
import store from './store'
import App from './App'
import './../semantic/dist/semantic.css'
import './../semantic/dist/semantic'

Vue.config.productionTip = false
Vue.use(require('croud-vue-semantic'))
Vue.use(require('vue-resource'))
Vue.use(require('vue-semantic-showcase'))

Vue.use(CroudLayout, { store })


/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<croud-layout><App slot="content"/></croud-layout>',
    components: { App },
    store,
})
