
import Vue from 'vue'
import DropdownIndicatorButton from '../../../src/components/shared/buttons/DropdownIndicatorButton'

const props = {}
const Constructor = Vue.extend({
    render(h) {
        return h(DropdownIndicatorButton, {
            props,
        })
    },
})

const vm = new Constructor().$mount()

describe('DropdownIndicatorButton', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })

    it('should change direction when collapsed', () => {
        props.collapsed = true
        vm.$forceUpdate()
        vm.$nextTick(() => {
            expect(vm.$el).toMatchSnapshot()
        })
    })
})
