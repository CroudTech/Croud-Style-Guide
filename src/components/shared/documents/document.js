import { createWriteStream } from 'streamsaver'

export default {
    props: {
        file: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            percentage: 0,
        }
    },

    computed: {
        iconClasses() {
            const classes = {}
            switch (this.file.mime_type) {
            case ('text/rtf'):
                classes.file = true
                break

            case ('application/pdf'):
                classes.pdf = true
                classes.red = true
                break

            case ('application/msword'):
                classes.word = true
                classes.blue = true
                break

            case ('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'):
                classes.excel = true
                classes.green = true
                break

            case ('application/powerpoint'):
                classes.powerpoint = true
                classes.blue = true
                break

            default:
                if (this.file.mime_type.indexOf('image')) {
                    classes.yellow = true
                    classes.image = true
                }
            }

            return classes
        },
    },

    methods: {
        download() {
            return fetch(`//${files_url}/download/${this.file.reference}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                },
            }).then((res) => {
                const fileStream = createWriteStream(this.file.name)
                const writer = fileStream.getWriter()
                // Later you will be able to just simply do
                // res.body.pipeTo(fileStream)
                const resourceSize = res.headers.get('Content-Length')
                const reader = res.body.getReader()
                let totalChunkSize = 0

                const pump = () => reader.read()
                    .then(({ value, done }) => {
                        if (done) return writer.close()

                        totalChunkSize += value.length
                        this.percentage = Math.round((totalChunkSize / resourceSize) * 100)

                        return writer.write(value).then(pump)
                    })

                // Start the reader
                pump().then(() => {
                    this.percentage = 0
                    this.controller = null
                })
            }).catch(console.error)
        },

        getPresignedUrl() {
            return fetch(`//${files_url}/presign/${this.file.reference}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                },
            })
        },
    },
}
