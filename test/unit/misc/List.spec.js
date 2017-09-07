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
        afterEach(() => {
            vm.loading = false
        })

        it('should match the snapshot', () => {
            expect(vm.$el).toMatchSnapshot()
        })
    })

    describe('hide header', () => {
        beforeEach(() => {
            vm.showHeader = false
        })
        afterEach(() => {
            vm.showHeader = true
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

        describe('header-item', () => {
            it('should match the snapshot', () => {
                const comp = new Vue({
                    components: { List },
                    render(h) {
                        return h('list', { props: { showHeader: true } }, [
                            h('div', {
                                slot: 'header-item',
                            }, [
                                h('div', {
                                    class: 'item',
                                    domProps: {
                                        innerHTML: 'selected-item',
                                    },
                                }),
                            ]),
                        ])
                    },
                }).$mount()

                expect(comp.$el).toMatchSnapshot()
            })
        })

        describe('default-header-item', () => {
            it('should match the snapshot', () => {
                const comp = new Vue({
                    components: { List },
                    render(h) {
                        return h('list', { props: { showHeader: true } }, [
                            h('div', {
                                slot: 'default-header-item',
                            }, [
                                h('div', {
                                    class: 'item',
                                    domProps: {
                                        innerHTML: 'Custom Select an item',
                                    },
                                }),
                            ]),
                        ])
                    },
                }).$mount()

                expect(comp.$el).toMatchSnapshot()
            })
        })

        describe('items', () => {
            it('should match the snapshot', () => {
                const comp = new Vue({
                    components: { List },
                    render(h) {
                        return h('list', {
                            props: { listGetter: [{ name: 'test-scoped-item' }] },
                            scopedSlots: {
                                items: scope => h('span', scope.item.name),
                            },
                        })
                    },
                }).$mount()

                expect(comp.$el).toMatchSnapshot()
            })
        })
    })
})
