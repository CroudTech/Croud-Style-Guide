<template>
    <button class="ui button" :class="{loading: downloading}" @click="exportData">
        <slot>Export</slot>
    </button>
</template>

<script>
    /**
     * Universal export button
     *
     * @example ./croud-export-button.md
     */
    export default {
        name: 'croud-export-button',

        props: {
           /**
            * export url
            */
            url: {
                type: String,
                required: true,
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

        methods: {
            exportData() {
                const xhr = new XMLHttpRequest()
                const self = this

                xhr.open('GET', this.url, true)
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
