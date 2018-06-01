
import Vue from 'vue'
import FullCalendar from '../../../src/components/shared/layout/FullCalendar'

const Constructor = Vue.extend(FullCalendar)

const vm = new Constructor().$mount()

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

    describe('views', () => {
        it('show default views', () => {
            expect(vm.$el.querySelector('.ui.view.buttons')).toMatchSnapshot()
        })

        it('changes views based on props', (done) => {
            vm.views = [{ type: 'agendaWeek', title: 'Agenda' }, { type: 'basicWeek', title: 'Basic' }]
            vm.$nextTick(() => {
                expect(vm.$el.querySelector('.ui.view.buttons')).toMatchSnapshot()
                done()
            })
        })
    })
})
