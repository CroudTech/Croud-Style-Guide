import Vue from 'vue'
import OverflowMenu from '../../../src/components/shared/menus/OverflowMenu'
import '../../../semantic/dist/semantic'

const Constructor = Vue.extend(OverflowMenu)

const vm = new Constructor({
    propsData: {
        options: [
            {
                name: 'Delete',
                method: jest.fn(),
            },
            {
                name: 'Postpone',
                method: jest.fn(),
            },
            {
                name: 'Copy',
                method: jest.fn(),
                disabled: true,
            },
        ],
    },
}).$mount()

describe('Overflow Menu', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })

    it('should be inactive on render', () => {
        expect(vm.$el.querySelector('.ui.menu').classList.contains('visible')).toBe(false)
    })

    describe('Menu Items', () => {
        it('should render all menu items', () => {
            expect(vm.$el.querySelector('.ui.menu').childElementCount).toBe(vm.options.length)
        })
        it('should call method on click', () => {
            vm.$el.querySelector('.item').click()
            expect(vm.options[0].method).toHaveBeenCalled()
        })
    })

    console.log(vm.$el.querySelector('.ui.menu'))
})
