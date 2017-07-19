import moment from 'moment'

export default {
    data() {
        return {
            search: '',
            date: moment(),
            toggleSidebar: false,
        }
    },

    methods: {
        alert(text) {
            alert(text)
        },
    },
}
