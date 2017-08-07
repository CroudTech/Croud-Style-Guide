import Vue from 'vue'
import DatePicker from '../../../src/components/shared/forms/DatePicker'

const Constructor = Vue.extend(DatePicker)

const vm = new Constructor().$mount()

describe('Date Picker', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
