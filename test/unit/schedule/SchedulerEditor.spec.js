import Vue from 'vue'
import VueSemantic from 'croud-vue-semantic'
import moment from 'moment'
import SchedulerEditor from '../../../src/components/shared/scheduler/SchedulerEditor'
import '../../../semantic/dist/semantic'

Vue.use(VueSemantic)

const Constructor = Vue.extend(SchedulerEditor)

const vm = new Constructor({
    propsData: {
        rootObject: {
            id: 1,
            name: 'rootObject',
        },
    },
}).$mount()

describe('Scheduler Editor', () => {
    describe('empty schedule', () => {
        let schedule

        it('should match the snapshot', () => {
            schedule = vm.schedule
            expect(vm.$el).toMatchSnapshot()
        })

        it('should update the schedule when root object prop changes', (done) => {
            vm.rootObject = {
                'service=scheduler;table=timetables;field=frequency;': {
                    recur: 'everyFortnight',
                    at: ['00:00'],
                    timezone: 'Europe/London',
                    months: ['march', 'april', 'may'],
                    days: ['monday'],
                },
            }

            vm.$nextTick(() => {
                expect(vm.schedule).not.toBe(schedule)
                done()
            })
        })
    })


    describe('data transformation', () => {
        describe('input', () => {
            describe('frequency', () => {
                it('should set the correct months', (done) => {
                    vm.rootObject = {
                        'service=scheduler;table=timetables;field=frequency;': {
                            months: ['march', 'april', 'december'],
                        },
                    }

                    vm.$nextTick(() => {
                        expect(vm.schedule.frequency.months.january).toBe(false)
                        expect(vm.schedule.frequency.months.march).toBe(true)
                        expect(vm.schedule.frequency.months.april).toBe(true)
                        expect(vm.schedule.frequency.months.december).toBe(true)
                        done()
                    })
                })

                it('should set the correct days', (done) => {
                    vm.rootObject = {
                        'service=scheduler;table=timetables;field=frequency;': {
                            days: ['monday', 'wednesday', 'saturday'],
                        },
                    }

                    vm.$nextTick(() => {
                        expect(vm.schedule.frequency.days.tuesday).toBe(false)
                        expect(vm.schedule.frequency.days.monday).toBe(true)
                        expect(vm.schedule.frequency.days.wednesday).toBe(true)
                        expect(vm.schedule.frequency.days.saturday).toBe(true)
                        done()
                    })
                })

                it('should set the recurrance', (done) => {
                    vm.rootObject = {
                        'service=scheduler;table=timetables;field=frequency;': {
                            recur: 'thirdWeekOfMonth',
                        },
                    }

                    vm.$nextTick(() => {
                        expect(vm.schedule.frequency.recur).toBe('thirdWeekOfMonth')
                        done()
                    })
                })

                it('should set the time', (done) => {
                    vm.rootObject = {
                        'service=scheduler;table=timetables;field=frequency;': {
                            at: ['00:00'],
                        },
                    }

                    vm.$nextTick(() => {
                        expect(vm.schedule.frequency.at).toBe('00:00')
                        done()
                    })
                })

                it('should set the timezone', (done) => {
                    vm.rootObject = {
                        'service=scheduler;table=timetables;field=frequency;': {
                            timezone: 'Europe/Berlin',
                        },
                    }

                    vm.$nextTick(() => {
                        expect(vm.schedule.frequency.timezone).toBe('Europe/Berlin')
                        done()
                    })
                })

                it('should match snapshot', (done) => {
                    vm.rootObject = {
                        'service=scheduler;table=timetables;field=frequency;': {
                            months: ['march', 'april', 'december'],
                            days: ['monday', 'wednesday', 'saturday'],
                            at: ['00:00'],
                            timezone: 'Europe/Berlin',
                            recur: 'thirdWeekOfMonth',
                        },
                    }

                    vm.$nextTick(() => {
                        expect(vm.schedule.frequency).toMatchSnapshot()
                        done()
                    })
                })
            })

            describe('limits', () => {
                it('should set the start date', (done) => {
                    vm.rootObject = {
                        'service=scheduler;table=timetables;field=starts_at;': '2018-03-07 12:00:00',
                    }

                    vm.$nextTick(() => {
                        expect(vm.schedule.limit.startsAt).toBe('2018-03-07 12:00:00')
                        done()
                    })
                })

                it('should set the end date', (done) => {
                    vm.rootObject = {
                        'service=scheduler;table=timetables;field=ends_at;': '2018-03-07 12:00:00',
                    }

                    vm.$nextTick(() => {
                        expect(vm.schedule.limit.endsAt).toBe('2018-03-07 12:00:00')
                        done()
                    })
                })

                it('should set the max executions', (done) => {
                    vm.rootObject = {
                        'service=scheduler;table=timetables;field=max_executions;': 10,
                    }

                    vm.$nextTick(() => {
                        expect(vm.schedule.limit.maxExecutions).toBe(10)
                        done()
                    })
                })

                it('should match snapshot', (done) => {
                    vm.rootObject = {
                        'service=scheduler;table=timetables;field=starts_at;': '2018-03-07 12:00:00',
                        'service=scheduler;table=timetables;field=ends_at;': '2018-04-07 12:00:00',
                        'service=scheduler;table=timetables;field=max_executions;': 10,
                    }

                    vm.$nextTick(() => {
                        expect(vm.schedule.limit).toMatchSnapshot()
                        done()
                    })
                })
            })

            it('should match snapshot', (done) => {
                vm.rootObject = {
                    'service=scheduler;table=timetables;field=frequency;': {
                        months: ['march', 'april', 'december'],
                        days: ['monday', 'wednesday', 'saturday'],
                        at: ['00:00'],
                        timezone: 'Europe/Berlin',
                        recur: 'thirdWeekOfMonth',
                    },
                    'service=scheduler;table=timetables;field=starts_at;': '2018-03-07 12:00:00',
                    'service=scheduler;table=timetables;field=ends_at;': '2018-04-07 12:00:00',
                    'service=scheduler;table=timetables;field=max_executions;': 10,
                }

                vm.$nextTick(() => {
                    expect(vm.schedule).toMatchSnapshot()
                    done()
                })
            })
        })

        describe('output', () => {
        })
    })
})
