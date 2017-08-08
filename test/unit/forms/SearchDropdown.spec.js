import Vue from 'vue'
import SearchDropdown from '../../../src/components/shared/forms/SearchDropdown'
import '../../../semantic/dist/semantic'

const Constructor = Vue.extend(SearchDropdown)

const vm = new Constructor({
    propsData: {
        url: 'api/users?filter={query}',
    },
}).$mount()

describe('Search Dropdown', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
