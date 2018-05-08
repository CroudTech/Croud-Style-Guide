
import Vue from 'vue'
import toggleHeader from '../../../src/components/shared/layout/toggle-header'

const Constructor = Vue.extend(toggleHeader)

const vm = new Constructor({
    propsData: {
        title: 'Test Header',
        collapsed: false,
    },
}).$mount()

describe('toggle-header', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })

    it('should show the collapse button', () => {
        expect(vm.$el.querySelectorAll('.large.angle.down.icon').length).toBe(1)
    })
})

describe('collapsed is false', () => {
    beforeEach(() => {
        vm.collapsed = true
    })

    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })

    it('should show the expand button', () => {
        expect(vm.$el.querySelectorAll('.large.angle.right.icon').length).toBe(1)
    })
})
