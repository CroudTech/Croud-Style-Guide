import moment from 'moment'
import Vue from 'vue'
import Toasted from 'vue-toasted'
import Quill from 'quill'
import VueQuill from 'vue-quill'
import Cleave from 'vue-cleave'
import CroudForms from 'croud-forms'
import VueSemantic from 'croud-vue-semantic'
import VueFullCalendar from 'vue-full-calendar'

import 'cleave.js/src/addons/phone-type-formatter.gb'

import CroudTheme from '../components/shared/forms/quill/themes/CroudTheme'
import '../components/shared/forms/toast/themes/croudToastTheme.scss'

Vue.use(VueSemantic)
Vue.use(VueFullCalendar)
Vue.use(CroudForms)
Vue.use(VueQuill)
Vue.use(Toasted, {
    fullWidth: true,
    theme: 'croud',
    duration: 2500,
    position: 'top-center',
})

Vue.component('planning-component', {})
Vue.component('journal-component', {})
Vue.component('cleave', Cleave)

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
            showModal: false,
            dropdownVal: '',
            radio: 1,
            cleave: '123456789012345',
            telephone: '01743211176',

            showSchema: false,
            formSchema: [
                {
                    class: 'two fields',
                    children: [
                        {
                            field_name: 'First name',
                            field_type: 'text',
                            field_slug: 'first_name',
                        },
                        {
                            field_name: 'Last name',
                            field_type: 'text',
                            field_slug: 'last_name',
                        },
                    ],
                },
                {
                    class: 'three fields',
                    children: [
                        {
                            field_name: 'Age',
                            field_type: 'number',
                            field_slug: 'age',
                        },

                        {
                            field_name: 'Country',
                            field_type: 'search-select',
                            field_slug: 'country',
                            field_options: {
                                select_options: {
                                    uk: 'United Kingdom',
                                    us: 'USA',
                                    au: 'Australia',
                                },
                            },
                        },

                        {
                            field_name: 'Sort Code',
                            field_type: 'sort-code',
                            field_slug: 'sortCode',
                        },
                    ],
                },

                {
                    class: 'ui secondary basic segment',
                    children: [
                        {
                            field_name: 'What is your favourite number?',
                            field_type: 'radio',
                            field_slug: 'number',
                            field_options: {
                                select_options: {
                                    1: 'One',
                                    2: 'Two',
                                    3: 'Three',
                                },
                            },
                        },
                    ],
                },
            ],
            user: {
                name: 'Croud',
                first_name: null,
                last_name: null,
                number: 1,
                country: 'uk',
                age: 21,
                sortCode: '55-05-55',
                avatar: '',
            },

            events: [
                {
                    title: 'event1',
                    start: moment(),
                },
                {
                    title: 'event2',
                    start: moment().subtract(1, 'day').hour(10),
                    end: moment().subtract(1, 'day').hour(14),
                },
                {
                    title: 'event3',
                    start: moment().add(1, 'day'),
                    allDay: true,
                },
            ],

            listExamples: {
                selected: {},
                basic: [
                    { name: 'one' },
                    { name: 'two' },
                    { name: 'three' },
                ],
                scoped: [
                    { name: 'Handpicked Hotels' },
                    { name: 'Victoria Secret' },
                    { name: 'Amazon Prime' },
                ],
            },

            supercroudSelector: {
                value: '',
                teams: [
                    { name: 'Supercroud',
                        users: [
                            { id: 1, name: 'Joe Blogs' },
                            { id: 2, name: 'John Doe' },
                            { id: 3, name: 'Jason Bourne' },
                        ],
                    },
                ],
                additionalUser: [
                    { id: 4, name: 'Jack Overdue' },
                ],
            },
        }
    },

    methods: {
        alert(...text) {
            alert(...text)
        },
    },

    mounted() {
        if (this.$refs.confirmation) {
            Vue.prototype.$confirm = this.$refs.confirmation.confirm
        }
    },
}
