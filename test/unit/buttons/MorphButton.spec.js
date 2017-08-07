import Vue from 'vue'
import MorphButton from '../../../src/components/shared/buttons/MorphButton'

const Constructor = Vue.extend(MorphButton)

const vm = new Constructor({
    propsData: {
        options: [
            'expand all',
            'close all',
        ],
        cta: true,
    },
}).$mount()

describe('Morph Button', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
