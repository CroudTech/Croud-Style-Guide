<template>
    <semantic-form-dropdown value="" :options="[]" :settings="computedSettings" :placeholder="placeholder" search/>
</template>

<script>
    import _ from 'lodash'

    /**
    * A date picker based around pikaday
    *
    * @example ./croud-search-dropdown.md
    */
    export default {
        name: 'croud-search-dropdown',

        props: {
            placeholder: {
                type: String,
                default: 'Search...',
            },

            url: {
                type: String,
                required: true,
            },

            value: {
                type: String,
            },

            rootUrl: {
                type: String,
                // default: `//${gateway_url}`,
                default: 'https://vuetable.ratiw.net',
            },

            transform: {
                type: Function,
                default(result) {
                    return result
                },
            },

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
                return _.defaultsDeep({
                    apiSettings: {
                        url: `${this.rootUrl}/${this.url}`,
                        beforeXHR(xhr) {
                            // xhr.setRequestHeader('authorization', `Bearer ${localStorage.getItem('jwt')}`)
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
                }, this.settings)
            },
        },
    }
</script>
