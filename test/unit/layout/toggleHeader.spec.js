
import Vue from 'vue'
import toggleHeader from '../../../src/components/shared/layout/ToggleHeader'

const Constructor = Vue.extend(toggleHeader)

const vm = new Constructor({
    propsData: {
        title: 'Test Header',
        collapsed: true,
    },
}).$mount()

describe('toggle-header', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })

    it('should show the collapse button', () => {
        expect(vm.$el.querySelectorAll('.chevron.right.icon').length).toBe(1)
    })
})

describe('collapsed is false', () => {
    beforeEach(() => {
        vm.collapsed = false
    })

    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })

    it('should show the expand button', () => {
        expect(vm.$el.querySelectorAll('.chevron.down.icon').length).toBe(1)
    })
})
