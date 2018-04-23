
import Vue from 'vue'
import SaveButtonWithDropdown from '../../../src/components/shared/buttons/SaveButtonWithDropdown'
import '../../../semantic/dist/semantic'

const Constructor = Vue.extend({
    props: {
        loading: {},
    },
    render(h) {
        return h(SaveButtonWithDropdown, {
            props: {
                loading: this.loading,
                menu: [
                    { title: 'foo', action: () => console.log('foo') },
                    { title: 'bar', action: () => console.log('bar') },
                ],
            },
        })
    },
})

const vm = new Constructor({
    propsData: {
        loading: false,
    },
}).$mount()

describe('SaveButtonWithDropdown', () => {
    describe('should build component', () => {
        it('should match the snapshot', () => {
            expect(vm.$el).toMatchSnapshot()
        })
    })

    it('should handle a loading state', (done) => {
        vm.loading = true
        vm.$nextTick(() => {
            const saveNode = vm.$el.querySelector('.blue.button')
            const dropdownNode = vm.$el.querySelector('.dropdown.button')

            expect(saveNode.classList).toContain('loading')
            expect(dropdownNode.classList).toContain('disabled')
            expect(saveNode.disabled).toBe(true)
            done()
        })
    })
})
