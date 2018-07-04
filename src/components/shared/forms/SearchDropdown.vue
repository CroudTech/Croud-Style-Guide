<template>
    <semantic-form-dropdown value="" :options="[]" :settings="computedSettings" :placeholder="placeholder" v-bind="$attrs" search/>
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
                type: [String, Number],
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

            computedUrl() {
                if (this.url.match(/:\/\//)) return this.url

                return `//${gateway_url}/${this.url}`
            },

            computedSettings() {
                const $this = this
                return _.defaultsDeep(this.settings, {
                    apiSettings: {
                        url: this.computedUrl,
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
