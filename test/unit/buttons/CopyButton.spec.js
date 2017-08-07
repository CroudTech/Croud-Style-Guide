import Vue from 'vue'
import CopyButton from '../../../src/components/shared/buttons/CopyButton'

const Constructor = Vue.extend(CopyButton)

const vm = new Constructor({
    propsData: {
        text: 'Copy',
    },
}).$mount()

describe('Copy Button', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
