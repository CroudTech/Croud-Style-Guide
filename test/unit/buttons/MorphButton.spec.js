import Vue from 'vue'
import MorphButton from '../../../src/components/shared/buttons/MorphButton'

const Constructor = Vue.extend(MorphButton)

const vm = new Constructor({
    propsData: {
        options: [
            { name: 'close all' },
            { name: 'expand all' },
        ],
        cta: true,
        active: 1,
    },
}).$mount()

describe('Morph Button', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })

    it('should override active index when active prop is passed', () => {
        expect(vm.activeIndex).toBe(vm.active)
    })

    it('should display the correct text on render', () => {
        expect(vm.$el.innerHTML).toBe(vm.options[1 - vm.activeIndex].name)
    })

    it('should toggle text on click', () => {
        vm.$el.click()
        expect(vm.$el.innerHTML).toBe(vm.options[1 - vm.active].name)
        vm.$el.click()
        expect(vm.$el.innerHTML).toBe(vm.options[1 - vm.active].name)
    })
})
