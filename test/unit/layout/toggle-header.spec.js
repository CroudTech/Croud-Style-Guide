
import Vue from 'vue'
import toggle-header from '../../../src/components/shared/layout/toggle-header'

const Constructor = Vue.extend(toggle-header)

const vm = new Constructor().$mount()

describe('toggle-header', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
