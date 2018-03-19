import Vue from 'vue'
import VueSemantic from 'croud-vue-semantic'
import moment from 'moment-timezone'

import '../../../semantic/dist/semantic'
import SchedulerModal from '../../../src/components/shared/scheduler/SchedulerModal'

moment.tz.guess = jest.fn(() => 'Etc/UTC')

Vue.use(VueSemantic)

const Constructor = Vue.extend(SchedulerModal)

const vm = new Constructor({
    propsData: {
        rootObject: {
            id: 1,
            name: 'rootObject',
        },
    },
}).$mount()

describe('Scheduler Modal', () => {
    describe('closed modal', () => {
        it('should not show scheduler', () => {
            expect(vm.$children[0].$children.length).toBe(0)
            expect(vm.$children[0].$el).toMatchSnapshot()
        })
    })

    describe('open modal', () => {
        it('should show scheduler', (done) => {
            vm.showModal = true

            vm.$nextTick(() => {
                expect(vm.$children[0].$children.length).toBe(1)
                expect(vm.$children[0].$el).toMatchSnapshot()
                done()
            })
        })
    })
})
