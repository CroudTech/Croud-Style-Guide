export default {
    methods: {
        urlParamGen(paramObject, prefix = '', delimeter = '&') {
            const str = []
            for (const key in paramObject) {
                switch (typeof paramObject[key]) {
                case 'object':
                    if (Array.isArray(paramObject[key])) {
                        paramObject[key].forEach((param) => {
                            str.push(`${encodeURIComponent(prefix.length ? `${prefix}[${key}][]` : `${key}[]`)}=${encodeURIComponent(`${param}`)}`)
                        })
                    } else {
                        str.push(this.urlParamGen(paramObject[key], key))
                    }
                    break
                default:
                    str.push(`${encodeURIComponent(prefix.length ? `${prefix}[${key}]` : key)}=${encodeURIComponent(`${paramObject[key]}`)}`)
                    break
                }
            }

            return str.filter(Boolean).join(delimeter)
        },
    },
}
