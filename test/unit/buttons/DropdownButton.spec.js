
import Vue from 'vue'
import DropdownButton from '../../../src/components/shared/buttons/DropdownButton'
import '../../../semantic/dist/semantic'


const Constructor = Vue.extend(DropdownButton)

const vm = new Constructor({
    propsData: {
        menu: [
            { title: 'foo', action: () => console.log('foo') },
            { title: 'bar', action: () => console.log('bar') },
        ],
        loading: false,
    },
}).$mount()

describe('DropdownButton', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })

    it('should disable the dropdown if loading', (done) => {
        vm.loading = true
        vm.$nextTick(() => {
            expect(vm.$el).toMatchSnapshot()
            done()
        })
    })
})
