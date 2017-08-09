import Vue from 'vue'
import Paginator from '../../../src/components/shared/misc/Paginator'

const Constructor = Vue.extend(Paginator)

const vm = new Constructor({
    propsData: {
        pagination: {
            total_pages: 12,
        },
        currentPage: 5,
    },
}).$mount()

describe('Paginator', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })

    describe('Above 5 Pages', () => {
        beforeEach(() => {
            vm.pagination.total_pages = 6
        })

        it('should only render large paginator', () => {
            expect(vm.$el.querySelectorAll('span').length).toBe(0)
        })
    })

    describe('Less Than 5 Pages', () => {
        beforeEach(() => {
            vm.pagination.total_pages = 3
        })

        it('should only render small paginator', () => {
            expect(vm.$el.querySelectorAll('span').length).not.toBe(0)
        })

        it('should render all page items', () => {
            expect(vm.$el.querySelectorAll('.item').length).toBe(vm.pagination.total_pages)
        })
    })

    describe('Only Single Page', () => {
        beforeEach(() => {
            vm.pagination.total_pages = 1
        })

        it('shouldn\'t render', () => {
            expect(vm.$el.childElementCount).toBeUndefined()
        })
    })
})
