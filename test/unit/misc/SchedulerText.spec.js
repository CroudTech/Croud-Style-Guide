import Vue from 'vue'
import moment from 'moment'
import VueSemantic from 'croud-vue-semantic'
import SchedulerText from '../../../src/components/shared/misc/SchedulerText'

Vue.use(VueSemantic)

const Constructor = Vue.extend(SchedulerText)

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
            'service=scheduler;table=timetables;field=frequency;': {
                recur: 'everyFortnight',
                at: ['00:00'],
                timezone: 'Europe/London',
                months: ['march', 'april', 'may'],
                days: ['monday'],
            },
            'service=scheduler;table=timetables;field=max_executions;': 10,
            'service=scheduler;table=timetables;field=starts_at;': '2018-03-07 12:00:00',
            'service=scheduler;table=timetables;field=ends_at;': '2018-03-08 12:00:00',
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
                'service=scheduler;table=timetables;field=frequency;': {
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
                    'service=scheduler;table=timetables;field=frequency;': {
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
                    'service=scheduler;table=timetables;field=frequency;': {
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
            it('should handle no date limits', (done) => {
                vm.rootObject = {
                    'service=scheduler;table=timetables;field=starts_at;': null,
                    'service=scheduler;table=timetables;field=ends_at;': null,
                }
                vm.$nextTick(() => {
                    expect(vm.datesText).toBe('')
                    done()
                })
            })

            it('should handle an upcoming date range', (done) => {
                vm.rootObject = {
                    'service=scheduler;table=timetables;field=starts_at;': moment().add(1, 'day').format('YYYY-MM-DD hh:mm:ss'),
                    'service=scheduler;table=timetables;field=ends_at;': moment().add(2, 'day').format('YYYY-MM-DD hh:mm:ss'),
                }
                vm.$nextTick(() => {
                    expect(vm.datesText).toContain('between')
                    done()
                })
            })

            describe('end date', () => {
                it('should handle end date', (done) => {
                    vm.rootObject = {
                        'service=scheduler;table=timetables;field=ends_at;': moment().add(1, 'day').format('YYYY-MM-DD hh:mm:ss'),
                    }
                    vm.$nextTick(() => {
                        expect(vm.datesText).toContain('ending')
                        expect(vm.ended).toBe(false)
                        done()
                    })
                })

                it('should handle passed end date', (done) => {
                    vm.rootObject = {
                        'service=scheduler;table=timetables;field=ends_at;': moment().subtract(1, 'day').format('YYYY-MM-DD hh:mm:ss'),
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
