import moment from 'moment'

export default {
    data() {
        return {
            search: '',
            date: moment(),
        }
    },

    methods: {
        alert(text) {
            alert(text)
        },
    },
}
