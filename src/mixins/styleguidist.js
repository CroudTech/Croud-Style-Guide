import moment from 'moment'
import Vue from 'vue'

Vue.use(require('croud-vue-semantic'))

Vue.component('planning-component', {})
Vue.component('journal-component', {})

export default {
    data() {
        return {
            searchText: '',
            today: moment(),
            toggleSidebar: false,
        }
    },

    methods: {
        alert(...text) {
            alert(...text)
        },
    },
}
