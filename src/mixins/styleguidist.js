import moment from 'moment'
import Vue from 'vue'
import Toasted from 'vue-toasted'
import Quill from 'quill'
import VueQuill from 'vue-quill'
import CroudTheme from '../components/shared/forms/quill/themes/CroudTheme'

Vue.use(VueQuill)
Vue.use(Toasted, {
    fullWidth: true,
    theme: 'croud',
    duration: 5000,
    position: 'top-center',
})


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
            checkbox: true,
            quillOutput: '',
        }
    },

    methods: {
        alert(...text) {
            alert(...text)
        },
    },
}
