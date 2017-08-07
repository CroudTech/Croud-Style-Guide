import Vue from 'vue'
import Filterbar from '../../../src/components/shared/layout/Filterbar'

const Constructor = Vue.extend(Filterbar)

const vm = new Constructor().$mount()

describe('Filerbar', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
