import Quill from 'quill'

const InlineEmbed = Quill.import('blots/embed')

class Shortcode extends InlineEmbed {
    static create(value) {
        const node = super.create(value)
        node.setAttribute('class', 'ql-shortcode')
        node.innerHTML = value

        return node
    }

    static value(node) {
        return node.innerHTML
    }

    static formats(node) {
        return { class: node.getAttribute('class') }
    }
}
Shortcode.blotName = 'shortcode'
Shortcode.tagName = 'span'


export default Shortcode
