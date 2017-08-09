import Vue from 'vue'
import Checkbox from '../../../src/components/shared/forms/Checkbox'

const Constructor = Vue.extend(Checkbox)

const vm = new Constructor().$mount()

describe('Checkbox', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })

    it('should be able to be checked and unchecked', () => {
        vm.$el.childNodes[0].click()
        expect(vm.$el.childNodes[0].checked).toBe(true)
        vm.$el.childNodes[0].click()
        expect(vm.$el.childNodes[0].checked).toBe(false)
    })
})
