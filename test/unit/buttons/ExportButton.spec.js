import Vue from 'vue'
import ExportButton from '../../../src/components/shared/buttons/ExportButton'

const Constructor = Vue.extend(ExportButton)

const vm = new Constructor().$mount()

describe('Export Button', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
