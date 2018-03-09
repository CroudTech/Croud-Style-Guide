import Vue from 'vue'
import VueSemantic from 'croud-vue-semantic'
import moment from 'moment'
import SchedulerEditor from '../../../src/components/shared/scheduler/SchedulerEditor'
import '../../../semantic/dist/semantic'

Vue.use(VueSemantic)

const Constructor = Vue.extend(SchedulerEditor)

const vm = new Constructor({
    propsData: {
        rootObject: {
            id: 1,
            name: 'rootObject',
        },
    },
}).$mount()

describe('Scheduler Editor', () => {
    it('should match the snapshot', (done) => {
        vm.$nextTick(() => {
            expect(vm.$el).toMatchSnapshot()
            done()
        })
    })


    describe('data transformation', () => {
        describe('input', () => {
        })

        describe('output', () => {
        })
    })
})
