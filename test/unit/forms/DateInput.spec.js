import Vue from 'vue'
import moment from 'moment'
import DateInput from '../../../src/components/shared/forms/DateInput'

const Constructor = Vue.extend(DateInput)

const vm = new Constructor({
    propsData: {
        value: moment(),
    },
}).$mount()

const input = jest.fn()
const invalid = jest.fn()
const validation = jest.fn()
vm.$on('input', input)
vm.$on('invalid-date', invalid)
vm.$on('validation-error', validation)

describe('Date Input', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })

    describe('events', () => {
        beforeEach(() => {
            input.mockReset()
            invalid.mockReset()
            validation.mockReset()
        })
        it('should fire input event when date changes', (done) => {
            vm.date = moment().add(1, 'd')
            vm.$nextTick(() => {
                expect(input).toBeCalled()
                done()
            })
        })

        it('should fire invalid-date event when date is cleared', (done) => {
            vm.date = ''
            vm.$nextTick(() => {
                expect(invalid).toBeCalled()
                done()
            })
        })

        describe('validation', () => {
            it('should fire validation-error event if sooner than min date', (done) => {
                vm.min = moment().add(1, 'd')
                vm.max = null
                vm.date = moment()
                vm.$nextTick(() => {
                    expect(validation).toBeCalled()
                    done()
                })
            })

            it('should fire validation-error event if later than max date', (done) => {
                vm.min = null
                vm.max = moment().subtract(1, 'd')
                vm.date = moment()

                vm.$nextTick(() => {
                    expect(validation).toBeCalled()
                    done()
                })
            })

            it('should not fire validation-error if between min and max', (done) => {
                vm.min = moment().subtract(1, 'd')
                vm.max = moment().add(1, 'd')
                vm.date = moment()

                vm.$nextTick(() => {
                    expect(validation).not.toBeCalled()
                    done()
                })
            })
        })
    })
})
