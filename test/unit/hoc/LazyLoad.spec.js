import Vue from 'vue/dist/vue.common'
import Lazy from '../../../src/components/shared/hoc/LazyLoad'

window.IntersectionObserver = jest.fn(() => ({
    observe: jest.fn(),
}))

const Constructor = Vue.extend(Lazy)
const mounted = jest.fn()
const renderer = Vue.compile('<div>Test</div>')
const patsy = {
    render: renderer.render,
    staticRenderFns: renderer.staticRenderFns,
    mounted,
}

const vm = new Constructor()

vm.$slots.default = [vm.$createElement(patsy)]
vm.$mount()

describe('Lazy Load', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })

    it('should lazy load when in view', (done) => {
        vm.outOfView = false
        vm.$nextTick(() => {
            expect(vm.$el).toMatchSnapshot()
            expect(mounted).toHaveBeenCalled()
            done()
        })
    })
})
