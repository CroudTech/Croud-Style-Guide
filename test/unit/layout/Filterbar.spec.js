import Vue from 'vue'
import Filterbar from '../../../src/components/shared/layout/Filterbar'

const updateSearch = jest.fn()

const Constructor = Vue.extend({
    data() {
        return {
            showDefault: false,
            showAdvancedFilters: false,
        }
    },
    render(h) {
        return h(Filterbar, {
            on: {
                'update:search': updateSearch,
            },
        }, [
            this.showDefault ? h('div', {
                class: 'default-slot-test',
            }) : null,
            this.showAdvancedFilters ? h('div', {
                class: 'advanced-slot-test',
                slot: 'advanced-filters',
            }) : null,

        ])
    },
})

const vm = new Constructor().$mount()

describe('Filerbar', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })

    it('should emit new search to parent', () => {
        const newSearchTerm = 'netflix'
        vm.$children[0]._search = newSearchTerm
        expect(updateSearch).toBeCalledWith(newSearchTerm)
    })

    describe('slots', () => {
        beforeEach(() => {
            vm.showDefault = false
            vm.showAdvancedFilters = false
        })

        it('should show default props', (done) => {
            vm.showDefault = true
            vm.$nextTick(() => {
                expect(vm.$el.querySelectorAll('.default-slot-test').length).toBe(1)
                done()
            })
        })

        it('should hide advanced filters by default', (done) => {
            vm.showAdvancedFilters = true
            vm.$nextTick(() => {
                expect(vm.$children[0].collapse).toBe(true)
                expect(vm.$el.querySelector('button').textContent).toBe('Advanced')
                done()
            })
        })

        it('should show advanced filters when not collapsed', (done) => {
            vm.showAdvancedFilters = true
            vm.$children[0].collapse = false
            vm.$nextTick(() => {
                expect(vm.$el.querySelectorAll('.advanced-slot-test').length).toBe(1)
                done()
            })
        })
    })
})
