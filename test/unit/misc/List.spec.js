import Vue from 'vue'
import List from '../../../src/components/shared/misc/List'
import '../../../semantic/dist/semantic'

Vue.use(require('croud-vue-semantic'))

const Constructor = Vue.extend(List)

const vm = new Constructor({
    propsData: {
        loading: false,
        headerItem: { name: 'foo' },
        listGetter: [
          { name: 'foo' },
          { name: 'bar' },
          { name: 'baz' },
        ],
    },
}).$mount()

describe('List', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })

    describe('loading', () => {
        beforeEach(() => {
            vm.loading = true
        })

        it('should match the snapshot', () => {
            expect(vm.$el).toMatchSnapshot()
        })
    })

    describe('hide header', () => {
        beforeEach(() => {
            vm.showHeader = false
        })

        it('should match the snapshot', () => {
            expect(vm.$el).toMatchSnapshot()
        })
    })

    describe('slots', () => {
        describe('header-action', () => {
            it('should match the snapshot', () => {
                const comp = new Vue({
                    components: { List },
                    render(h) {
                        return h('list', [
                            h('div', {
                                slot: 'header-action',
                            }, [
                                h('button', {
                                    class: 'ui button tiny blue',
                                    domProps: {
                                        innerHTML: 'test',
                                    },
                                }),
                            ]),
                        ])
                    },
                }).$mount()

                expect(comp.$el).toMatchSnapshot()
            })
        })
    })
})
