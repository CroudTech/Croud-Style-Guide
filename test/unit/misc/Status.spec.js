import Vue from 'vue'
import Status from '../../../src/components/shared/misc/Status'

const Constructor = Vue.extend(Status)

const context = {
    contextual_status: {
        status: 'in progress',
        colour: 'yellow',
    },
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

    it('should add colour to the class', () => {
        expect(vm.classes).toContain(context.contextual_status.colour)
    })
})
