import Vue from 'vue'
import Panel from '../../../src/components/shared/layout/Panel'

const Constructor = Vue.extend(Panel)

const vm = new Constructor().$mount()

describe('Panel', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
