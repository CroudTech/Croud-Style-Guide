import Vue from 'vue'
import moment from 'moment'
import Date from '../../../src/components/shared/misc/Date'

const Constructor = Vue.extend(Date)

const vm = new Constructor({
    propsData: {
        date: moment('2017-08-08T14:20:04+00:00'),
        format: 'll',
    },
}).$mount()

describe('Date', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })

    it('should format date as specified', () => {
        expect(vm.$el.innerHTML).toBe(vm.date.format(vm.format))
    })
})
