import Vue from 'vue'
import moment from 'moment'
import Status from '../../../src/components/shared/misc/Status'

const Constructor = Vue.extend(Status)

const context = {
    status: 'in_progress',
    qa: false,
    deleted_at: null,
}

const vm = new Constructor({
    propsData: {
        context,
    },
}).$mount()

describe('Status', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })

    it('should respect the qa flag', (done) => {
        context.qa = true
        vm.$nextTick(() => {
            expect(vm.classes).toContain('blue')
            expect(vm.status).toBe('QA TASK')
            done()
        })
    })

    it('should respect a deleted_at date', (done) => {
        context.deleted_at = moment()
        vm.$nextTick(() => {
            expect(vm.classes).toContain('red')
            expect(vm.status).toBe('CANCELLED')
            done()
        })
    })
})
