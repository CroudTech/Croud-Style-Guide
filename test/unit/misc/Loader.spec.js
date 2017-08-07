import Vue from 'vue'
import Loader from '../../../src/components/shared/misc/Loader'

const Constructor = Vue.extend(Loader)

const vm = new Constructor({
    propsData: {
        loading: true,
        size: 'small',
    },
}).$mount()

describe('Loader', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })

    describe('not loading', () => {
        beforeEach(() => {
            vm.loading = false
        })

        it('should match the snapshot', () => {
            expect(vm.$el).toMatchSnapshot()
        })
    })
})
