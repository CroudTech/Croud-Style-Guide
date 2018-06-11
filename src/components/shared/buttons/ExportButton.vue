<template>
    <button class="ui button" :class="{loading: downloading}" @click="exportData">
        <slot>Export</slot>
    </button>
</template>

<script>
    import urlParams from '../mixins/urlParams'

    /**
     * Universal export button
     *
     * @example ./croud-export-button.md
     */

    export default {
        name: 'croud-export-button',

        mixins: [urlParams],

        props: {
           /**
            * export url
            */
            url: {
                type: String,
                required: true,
            },

            /**
            * optional url param object to be appended to the export url
            */
            additionalParams: {
                type: Object,
                default() {
                    return {}
                },
            },

           /**
            * local filename
            */
            filename: {
                type: String,
                default: 'Export.xlsx',
            },

           /**
            * mimetype
            */
            filetype: {
                type: String,
                default: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },

        },

        data() {
            return {
                downloading: false,
            }
        },

        computed: {
            exportUrl() {
                return `${this.url}${Object.keys(this.additionalParams).length ? `?${this.urlParamGen(this.additionalParams)}` : ''}`
            },
        },

        methods: {
            exportData() {
                const xhr = new XMLHttpRequest()
                const self = this

                xhr.open('GET', this.exportUrl, true)
                xhr.responseType = 'blob'
                xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('jwt')}`)

                xhr.onload = function () {
                    if (this.status === 200) {
                        const link = document.createElement('a')
                        link.href = window.URL.createObjectURL(new Blob([this.response], { type: self.filetype }))
                        link.download = self.filename
                        link.click()
                        self.downloading = false
                    } else {
                        alert('Export failed')
                    }
                }

                this.downloading = true
                xhr.send()
            },
        },
    }
</script>
