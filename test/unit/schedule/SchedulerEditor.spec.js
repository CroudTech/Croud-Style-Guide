import Vue from 'vue'
import { pick } from 'lodash'
import VueSemantic from 'croud-vue-semantic'
import moment from 'moment-timezone'

import SchedulerEditor from '../../../src/components/shared/scheduler/SchedulerEditor'
import '../../../semantic/dist/semantic'

moment.tz.guess = jest.fn(() => 'Etc/UTC')

Vue.use(VueSemantic)

const Constructor = Vue.extend(SchedulerEditor)

const keys = {
    frequency: 'service=scheduler;table=timetables;field=frequency;',
    startsAt: 'service=scheduler;table=timetables;field=starts_at;',
    endsAt: 'service=scheduler;table=timetables;field=ends_at;',
    maxExecutions: 'service=scheduler;table=timetables;field=max_executions;',
}

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
            expect(vm.schedule).toMatchSnapshot()
        })

        it('should update the schedule when root object prop changes', (done) => {
            vm.rootObject = {
                [keys.frequency]: {
                    recur: 'everyFortnight',
                    at: ['00:00'],
                    timezone: 'Europe/London',
                    months: ['march', 'april', 'may'],
                    days: ['monday'],
                },
            }

            vm.$nextTick(() => {
                console.log('limits', schedule.limit.startsAt)
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
                        [keys.frequency]: {
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
                        [keys.frequency]: {
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
                        [keys.frequency]: {
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
                        [keys.frequency]: {
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
                        [keys.frequency]: {
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
                        [keys.frequency]: {
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
                        [keys.startsAt]: '2018-03-07 00:00:00',
                    }

                    vm.$nextTick(() => {
                        expect(vm.schedule.limit.startsAt).toBe('2018-03-07 00:00:00')
                        done()
                    })
                })

                it('should set the end date', (done) => {
                    vm.rootObject = {
                        [keys.endsAt]: '2018-03-07 00:00:00',
                    }

                    vm.$nextTick(() => {
                        expect(vm.schedule.limit.endsAt).toBe('2018-03-07 00:00:00')
                        done()
                    })
                })

                it('should set the max executions', (done) => {
                    vm.rootObject = {
                        [keys.maxExecutions]: 10,
                    }

                    vm.$nextTick(() => {
                        expect(vm.schedule.limit.maxExecutions).toBe(10)
                        done()
                    })
                })

                it('should match snapshot', (done) => {
                    vm.rootObject = {
                        [keys.startsAt]: '2018-03-07 00:00:00',
                        [keys.endsAt]: '2018-04-07 00:00:00',
                        [keys.maxExecutions]: 10,
                    }

                    vm.$nextTick(() => {
                        expect(vm.schedule.limit).toMatchSnapshot()
                        done()
                    })
                })
            })

            it('should match snapshot', (done) => {
                vm.rootObject = {
                    [keys.frequency]: {
                        months: ['march', 'april', 'december'],
                        days: ['monday', 'wednesday', 'saturday'],
                        at: ['00:00'],
                        timezone: 'Europe/Berlin',
                        recur: 'thirdWeekOfMonth',
                    },
                    [keys.startsAt]: '2018-03-07 00:00:00',
                    [keys.endsAt]: '2018-04-07 00:00:00',
                    [keys.maxExecutions]: 10,
                }

                vm.$nextTick(() => {
                    expect(vm.schedule).toMatchSnapshot()
                    done()
                })
            })
        })

        describe('output', () => {
            describe('frequency', () => {
                it('should set the correct months', (done) => {
                    vm.schedule.frequency.months.january = true
                    vm.schedule.frequency.months.february = false

                    vm.$nextTick(() => {
                        expect(vm.getSchedulerObject[keys.frequency].months).toContain('january')
                        expect(vm.getSchedulerObject[keys.frequency].months).not.toContain('february')
                        done()
                    })
                })

                it('should set the correct days', (done) => {
                    vm.schedule.frequency.days.monday = true
                    vm.schedule.frequency.days.tuesday = false
                    vm.schedule.frequency.days.wednesday = true

                    vm.$nextTick(() => {
                        expect(vm.getSchedulerObject[keys.frequency].days).toContain('monday')
                        expect(vm.getSchedulerObject[keys.frequency].days).toContain('wednesday')
                        expect(vm.getSchedulerObject[keys.frequency].days).not.toContain('tuesday')
                        done()
                    })
                })

                it('should set the recurrance', (done) => {
                    vm.schedule.frequency.recur = 'everyFortnight'

                    vm.$nextTick(() => {
                        expect(vm.getSchedulerObject[keys.frequency].recur).toBe('everyFortnight')
                        expect(vm.getSchedulerObject[keys.frequency].recur).not.toBe('thirdWeekOfMonth')
                        done()
                    })
                })

                it('should set the time', (done) => {
                    vm.schedule.frequency.at = '23:59'

                    vm.$nextTick(() => {
                        expect(vm.getSchedulerObject[keys.frequency].at).toContain('23:59')
                        expect(vm.getSchedulerObject[keys.frequency].at).not.toContain('00:00')
                        done()
                    })
                })

                it('should set the timezone', (done) => {
                    vm.schedule.frequency.timezone = 'Europe/Paris'

                    vm.$nextTick(() => {
                        expect(vm.getSchedulerObject[keys.frequency].timezone).toBe('Europe/Paris')
                        expect(vm.getSchedulerObject[keys.frequency].timezone).not.toBe('Europe/London')
                        done()
                    })
                })

                it('should match snapshot', (done) => {
                    vm.schedule.frequency = {
                        timezone: 'Europe/Rome',
                        at: '23:55',
                        recur: 'secondWeekOfMonth',
                        months: {
                            january: true,
                            february: false,
                            march: false,
                            april: false,
                            may: false,
                            june: false,
                            july: false,
                            august: false,
                            september: true,
                            october: false,
                            november: false,
                            december: false,
                        },
                        days: {
                            sunday: false,
                            monday: false,
                            tuesday: true,
                            wednesday: false,
                            thursday: true,
                            friday: false,
                            saturday: false,
                        },
                    }

                    vm.$nextTick(() => {
                        expect(vm.getSchedulerObject[keys.frequency]).toMatchSnapshot()
                        done()
                    })
                })
            })

            describe('limits', () => {
                it('should set the start date', (done) => {
                    vm.schedule.limit.startsAt = '2018-04-07 00:00:00'

                    vm.$nextTick(() => {
                        expect(vm.getSchedulerObject[keys.startsAt]).toBe('2018-04-07 00:00:00')
                        done()
                    })
                })

                it('should set the end date', (done) => {
                    vm.schedule.limit.endsAt = '2018-04-07 00:00:00'

                    vm.$nextTick(() => {
                        expect(vm.getSchedulerObject[keys.endsAt]).toBe('2018-04-07 00:00:00')
                        done()
                    })
                })

                it('should set the max executions', (done) => {
                    vm.schedule.limit.maxExecutions = 2

                    vm.$nextTick(() => {
                        expect(vm.getSchedulerObject[keys.maxExecutions]).toBe(2)
                        done()
                    })
                })

                it('should match snapshot', (done) => {
                    vm.schedule.limit.startsAt = '2018-04-07 00:00:00'
                    vm.schedule.limit.endsAt = '2018-04-06 00:00:00'
                    vm.schedule.limit.maxExecutions = 2

                    vm.$nextTick(() => {
                        expect(pick(vm.getSchedulerObject, [keys.maxExecutions, keys.startsAt, keys.endsAt])).toMatchSnapshot()
                        done()
                    })
                })
            })

            it('should match snapshot', (done) => {
                vm.schedule.frequency = {
                    timezone: 'Europe/Madrid',
                    at: '22:55',
                    recur: 'thirdWeekOfMonth',
                    months: {
                        january: true,
                        february: false,
                        march: false,
                        april: false,
                        may: false,
                        june: false,
                        july: false,
                        august: false,
                        september: true,
                        october: false,
                        november: false,
                        december: true,
                    },
                    days: {
                        sunday: false,
                        monday: false,
                        tuesday: true,
                        wednesday: false,
                        thursday: true,
                        friday: true,
                        saturday: false,
                    },
                }

                vm.schedule.limit.startsAt = '2018-04-02 00:00:00'
                vm.schedule.limit.endsAt = '2018-04-03 00:00:00'
                vm.schedule.limit.maxExecutions = 7

                vm.$nextTick(() => {
                    expect(vm.getSchedulerObject).toMatchSnapshot()
                    done()
                })
            })
        })
    })
})
