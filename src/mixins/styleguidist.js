import moment from 'moment'
import Vue from 'vue'
import Quill from 'quill'
import VueQuill from 'vue-quill'
import CroudTheme from '../components/shared/forms/quill/themes/CroudTheme'

Vue.use(VueQuill)
Vue.use(require('croud-vue-semantic'))

Vue.component('planning-component', {})
Vue.component('journal-component', {})

Quill.register({
    'themes/croud': CroudTheme,
})

export default {
    data() {
        return {
            searchText: '',
            today: moment(),
            tomorrow: moment().add(1, 'days'),
            toggleSidebar: false,
<<<<<<< HEAD
            checkbox: true,
=======
            quillOutput: '',
>>>>>>> 4976abe
        }
    },

    methods: {
        alert(...text) {
            alert(...text)
        },
    },
}
