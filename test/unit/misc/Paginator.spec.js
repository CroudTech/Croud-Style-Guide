import Vue from 'vue'
import Paginator from '../../../src/components/shared/misc/Paginator'

const Constructor = Vue.extend(Paginator)

const vm = new Constructor({
    propsData: {
        pagination: {
            total_pages: 12,
        },
        currentPage: 5,
    },
}).$mount()

describe('Paginator', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
