import Vue from 'vue'
import Checkbox from '../../../src/components/shared/forms/Checkbox'

const Constructor = Vue.extend(Checkbox)

const vm = new Constructor().$mount()

describe('Checkbox', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
