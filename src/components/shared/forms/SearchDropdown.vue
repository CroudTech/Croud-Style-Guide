<template>
    <semantic-form-dropdown value="" :options="[]" :settings="computedSettings" :placeholder="placeholder" search/>
</template>

<script>
    import _ from 'lodash'

    /**
    * A search dropdown based on the vue-semantic form dropdown
    *
    * @example ./croud-search-dropdown.md
    */
    export default {
        name: 'croud-search-dropdown',

        props: {
           /**
            * Placeholder text
            */
            placeholder: {
                type: String,
                default: 'Search...',
            },

           /**
            * request part of the url
            */
            url: {
                type: String,
                required: true,
            },

           /**
            * Optional v-model alias
            */
            value: {
                required: false,
                type: String,
            },

           /**
            * Hostname part of url
            */
            rootUrl: {
                type: String,
                default: `//${gateway_url}`,
                // default: 'https://vuetable.ratiw.net',
            },

           /**
            * Method to manipulate results back from the API
            */
            transform: {
                type: Function,
                default(result) {
                    return result
                },
            },

            /**
             * Semantic Dropdown settings
             */
            settings: {
                type: Object,
                default() {
                    return {}
                },
            },
        },

        computed: {
            model: {
                get() {
                    return this.value
                },
                set(value) {
                    this.$emit('input', value)
                },
            },

            computedSettings() {
                const $this = this
                return _.defaultsDeep(this.settings, {
                    apiSettings: {
                        url: `${this.rootUrl}/${this.url}`,
                        beforeXHR(xhr) {
                            xhr.setRequestHeader('authorization', `Bearer ${localStorage.getItem('jwt')}`)
                            return xhr
                        },
                        onResponse(response) {
                            response.results = response.data.map($this.transform)
                            return response
                        },
                    },
                    fields: {
                        results: 'data',
                        title: 'name',
                        value: 'id',
                    },
                    minCharacters: 3,
                    selectOnKeydown: false,
                    searchDelay: 200,
                    onChange: (...args) => {
                        this.$emit('selected', ...args)
                        this.model = args[0]
                    },
                })
            },
        },
    }
</script>
