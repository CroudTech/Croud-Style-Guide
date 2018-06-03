
import Vue from 'vue'
import VueFullCalendar from 'vue-full-calendar'
import FullCalendar from '../../../src/components/shared/layout/FullCalendar'

Vue.use(VueFullCalendar)

const Constructor = Vue.extend(FullCalendar)

const vm = new Constructor({
    propsData: {
        config: {
            defaultDate: '2018-01-01',
            defaultView: 'basicWeek',
        },
    },
}).$mount()

describe('FullCalendar', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })

    describe('loading', () => {
        it('should not show spinner by default', () => {
            expect(vm.$el.querySelector('.ui.dimmer').classList).not.toContain('active')
        })

        it('should show spinner if loading', (done) => {
            vm.loading = [{ type: 'agendaWeek', title: 'Agenda' }, { type: 'basicWeek', title: 'Basic' }]
            vm.$nextTick(() => {
                expect(vm.$el.querySelector('.ui.dimmer').classList).toContain('active')
                done()
            })
        })
    })

    describe('config', () => {
        it('sets default config', () => {
            expect(vm.$refs.calendar.fireMethod('option', 'header')).toBe(false)
        })

        it('merges config from prop', () => {
            expect(vm.$refs.calendar.fireMethod('option', 'defaultView')).toBe('basicWeek')
        })
    })

    describe('views', () => {
        it('show default views', () => {
            expect(vm.$el.querySelector('.ui.view.buttons')).toMatchSnapshot()
        })

        it('highlights current view', (done) => {
            vm.$nextTick(() => {
                expect(vm.$el.querySelector('.blue.button')).toMatchSnapshot()
                done()
            })
        })

        it('changes views based on props', (done) => {
            vm.views = [{ type: 'agendaWeek', title: 'Agenda' }, { type: 'basicWeek', title: 'Basic' }]
            vm.$nextTick(() => {
                expect(vm.$el.querySelector('.ui.view.buttons')).toMatchSnapshot()
                done()
            })
        })

        it('updates calendar view', () => {
            vm.changeView('month')
            expect(vm.currentView).toBe('month')
        })
    })

    describe('calendar controls', () => {
        describe('steps date', () => {
            it('forward', (done) => {
                vm.step()

                vm.$nextTick(() => {
                    expect(vm.title).toBe('February 2018')
                    done()
                })
            })

            it('back', (done) => {
                vm.step('prev')

                vm.$nextTick(() => {
                    expect(vm.title).toBe('January 2018')
                    done()
                })
            })
        })
    })

    describe('Calendar title and view', () => {
        it('gets title when mounted', () => {
            expect(vm.title).not.toBe('')
        })

        it('gets current view when mounted', () => {
            expect(vm.currentView).not.toBe('')
        })

        it('updates title when view changes', (done) => {
            vm.setTitle = jest.fn()
            vm.step()

            vm.$nextTick(() => {
                expect(vm.setTitle).toBeCalled()
                done()
            })
        })
    })
})
