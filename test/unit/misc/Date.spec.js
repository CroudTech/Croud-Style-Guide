import Vue from 'vue'
import moment from 'moment'
import Date from '../../../src/components/shared/misc/Date'

const Constructor = Vue.extend(Date)

const vm = new Constructor({
    propsData: {
        date: moment(),
    },
}).$mount()

describe('Date', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
