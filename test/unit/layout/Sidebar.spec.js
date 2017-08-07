import Vue from 'vue'
import Sidebar from '../../../src/components/shared/layout/Sidebar'

const Constructor = Vue.extend(Sidebar)

const vm = new Constructor().$mount()

describe('Sidebar', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
