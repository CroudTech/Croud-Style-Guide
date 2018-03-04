import Vue from 'vue'
import VueSemantic from 'croud-vue-semantic'
import SummarisedMultiSelector from '../../../src/components/shared/misc/SummarisedMultiSelector'
import '../../../semantic/dist/semantic'

Vue.use(VueSemantic)

const Constructor = Vue.extend(SummarisedMultiSelector)

const vm = new Constructor({
    propsData: {
        readOnly: false,
        options: [
            { id: 1, name: 'PPC' },
            { id: 2, name: 'Paid Social' },
            { id: 3, name: 'SEO' },
        ],
    },
}).$mount()

describe('summarised multi selector', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })

    describe('read only', () => {
        beforeEach(() => {
            vm.readOnly = true
        })

        it('should match the snapshot', () => {
            expect(vm.$el).toMatchSnapshot()
        })
    })
})
