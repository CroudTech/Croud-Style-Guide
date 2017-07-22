import Quill from 'quill'
import _ from 'lodash'
import Shortcode from '../formats/Shortcode'

const Snow = Quill.import('themes/snow')
Quill.register(Shortcode)

let $quill = ''

class CroudTheme extends Snow {
    constructor(quill, options) {
        $quill = quill
        const templates = options.templates

        templates.forEach((value) => {
            document.styleSheets[0].insertRule(`.ql-template .ql-picker-item[data-value="${value}"]:before {content: "${value}";}`)
        })
        options.modules.toolbar.container.push([{ template: templates }])

        super(quill, options)
    }

}

CroudTheme.DEFAULTS = _.defaultsDeep(Snow.DEFAULTS, {
    modules: {
        toolbar: {
            handlers: {
                template(val) {
                    const range = $quill.getSelection()

                    $quill.insertEmbed(range.index, 'shortcode', `{{ $${val} }}`)
                    $quill.insertText(range.index + 1, ' ')
                    $quill.setSelection(range.index + 2, Quill.sources.SILENT)
                },
            },
            container: [
                ['bold', 'italic', 'underline'],
                [
                    { list: 'ordered' }, { list: 'bullet' },
                ],
                [{ align: [] }],
                [{ header: [] }],
            ],
        },
    },
})


export default CroudTheme
