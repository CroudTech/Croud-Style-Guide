
import Vue from 'vue'
import SaveButton from '../../../src/components/shared/buttons/SaveButton'

const Constructor = Vue.extend({
    props: {
        loading: {},
    },
    render(h) {
        return h(SaveButton, {
            props: {
                loading: this.loading,
            },
        })
    },
})

const vm = new Constructor({
    propsData: {
        loading: false,
    },
}).$mount()

describe('SaveButton', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
        expect(vm.$el.disabled).toBe(false)
    })

    it('should handle a loading state', (done) => {
        vm.loading = true
        vm.$nextTick(() => {
            expect(vm.$el.classList).toContain('loading')
            expect(vm.$el.disabled).toBe(true)
            done()
        })
    })
})
