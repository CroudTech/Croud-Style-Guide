import Vue from 'vue'
import Panel from '../../../src/components/shared/layout/Panel'

const Constructor = Vue.extend(Panel)

// const vm = new Constructor().$mount()


const vm = new Constructor({
    propsData: {
        title: 'Test Panel',
        showCollapseToggle: true,
    },
}).$mount()

describe('Panel', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })

    it('should show the show / collapse button', () => {
        expect(vm.$el.querySelectorAll('.circular.angle.icon').length).toBe(1)
    })

    it('should show the text segment', () => {
        expect(vm.$el.querySelectorAll('.text.menu').length).toBe(1)
    })
})

describe('showCollapseToggle is false', () => {
    beforeEach(() => {
        vm.showCollapseToggle = false
    })

    it('shouldnt show the show / collapse button', () => {
        expect(vm.$el.querySelectorAll('.circular.angle.icon').length).toBe(0)
    })
})

describe('No title length and showCollapseToggle is false', () => {
    beforeEach(() => {
        vm.title = ''
        vm.showCollapseToggle = false
    })

    it('shouldnt show the text segment', () => {
        expect(vm.$el.querySelectorAll('.text.menu').length).toBe(0)
    })
})
