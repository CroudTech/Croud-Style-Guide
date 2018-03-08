import Vue from 'vue'
import VueSemantic from 'croud-vue-semantic'
import moment from 'moment'
import SchedulerModal from '../../../src/components/shared/scheduler/SchedulerModal'
import '../../../semantic/dist/semantic'

Vue.use(VueSemantic)

const Constructor = Vue.extend(SchedulerModal)

const vm = new Constructor({
    propsData: {
        schedule: {
            months: {
                january: false,
                february: false,
                march: false,
                april: false,
                may: false,
                june: false,
                july: false,
                august: false,
                september: false,
                october: false,
                november: false,
                december: false,
            },
            days: {
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
                sunday: false,
            },
            recur: 'daily',
            at: '00:00',
            timezone: ' Europe/London',
            limit: {
                from: moment().format('YYYY-MM-DD hh:mm:ss'),
                to: '',
                count: null,
            },
        },
    },
}).$mount()

describe('Scheduler Modal', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
