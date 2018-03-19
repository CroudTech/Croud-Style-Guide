import Vue from 'vue'
import moment from 'moment'
import VueSemantic from 'croud-vue-semantic'
import SchedulerText from '../../../src/components/shared/scheduler/SchedulerText'

Vue.use(VueSemantic)

const Constructor = Vue.extend(SchedulerText)

const keys = {
    frequency: 'service=scheduler;table=timetables;field=frequency;',
    startsAt: 'service=scheduler;table=timetables;field=starts_at;',
    endsAt: 'service=scheduler;table=timetables;field=ends_at;',
    maxExecutions: 'service=scheduler;table=timetables;field=max_executions;',
}

const noScheduleVm = new Constructor({
    propsData: {
        rootObject: { id: 1, name: 'rootObject' },
    },
}).$mount()

const vm = new Constructor({
    propsData: {
        rootObject: {
            id: 1,
            name: 'rootObject',
            [keys.frequency]: {
                recur: 'everyFortnight',
                at: ['00:00'],
                timezone: 'Europe/London',
                months: ['march', 'april', 'may'],
                days: ['monday'],
            },
            [keys.maxExecutions]: 10,
            [keys.startsAt]: '2018-03-07 12:00:00',
            [keys.endsAt]: '2018-03-08 12:00:00',
        },
    },
}).$mount()

describe('Scheduler Text', () => {
    describe('build and utils', () => {
        it('set up with mixin', () => {
            expect(typeof vm.schedule).toBe('object')
            expect(typeof vm.getSchedule).toBe('function')
        })
        it('should join text', () => {
            expect(vm.joinText(['foo', 'bar', 'baz'])).toBe('foo, bar & baz')
        })
    })

    describe('no schedule data', () => {
        let text = ''

        it('should match the snapshot', () => {
            text = noScheduleVm.$el.textContent
            expect(text).toMatchSnapshot()
        })

        it('should react to the prop change', (done) => {
            noScheduleVm.rootObject = {
                [keys.frequency]: {
                    days: ['friday'],
                },
            }
            noScheduleVm.$nextTick(() => {
                expect(noScheduleVm.$el.textContent).not.toBe(text)
                done()
            })
        })
    })

    describe('existing schedule', () => {
        it('should match the snapshot', () => {
            expect(vm.$el.textContent).toMatchSnapshot()
        })

        describe('days', () => {
            it('should handle a list', (done) => {
                vm.rootObject = {
                    [keys.frequency]: {
                        days: ['monday', 'tuesday', 'wednesday'],
                    },
                }

                vm.$nextTick(() => {
                    expect(vm.daysText).toBe('on <strong>Monday, Tuesday & Wednesday</strong>')
                    done()
                })
            })

            it('should notice all weekdays', (done) => {
                vm.rootObject = {
                    [keys.frequency]: {
                        days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
                    },
                }

                vm.$nextTick(() => {
                    expect(vm.daysText).toBe('on <strong>weekdays</strong>')
                    done()
                })
            })
        })

        describe('limits', () => {
            it('should handle an upcoming date range', (done) => {
                vm.rootObject = {
                    [keys.startsAt]: moment().add(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
                    [keys.endsAt]: moment().add(2, 'day').format('YYYY-MM-DD HH:mm:ss'),
                }
                vm.$nextTick(() => {
                    expect(vm.datesText).toContain('between')
                    done()
                })
            })

            describe('end date', () => {
                it('should handle end date', (done) => {
                    vm.rootObject = {
                        [keys.startsAt]: moment().subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
                        [keys.endsAt]: moment().add(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
                    }
                    vm.$nextTick(() => {
                        expect(vm.datesText).toContain('ending')
                        expect(vm.ended).toBe(false)
                        done()
                    })
                })

                it('should handle passed end date', (done) => {
                    vm.rootObject = {
                        [keys.startsAt]: moment().subtract(2, 'day').format('YYYY-MM-DD HH:mm:ss'),
                        [keys.endsAt]: moment().subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
                    }
                    vm.$nextTick(() => {
                        expect(vm.datesText).toContain('ended')
                        expect(vm.ended).toBe(true)
                        done()
                    })
                })
            })
        })
    })
})
