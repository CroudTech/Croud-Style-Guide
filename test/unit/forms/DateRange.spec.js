import Vue from 'vue'
import moment from 'moment'
import DateRange from '../../../src/components/shared/forms/DateRange'


const Constructor = Vue.extend(DateRange)

const vm = new Constructor({
    propsData: {
        start: moment(),
        end: moment().add(1, 'days'),
    },
}).$mount()

describe('Date Range', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
