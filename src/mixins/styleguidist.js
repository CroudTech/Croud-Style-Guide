import moment from 'moment'
import Vue from 'vue'

Vue.use(require('croud-vue-semantic'))

export default {
    data() {
        return {
            search: '',
            date: moment(),
            toggleSidebar: false,
        }
    },

    methods: {
        alert(...text) {
            alert(...text)
        },
    },
}
