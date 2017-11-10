import Vue from 'vue'
import VueSemantic from 'croud-vue-semantic'
import SearchDropdown from '../../../src/components/shared/forms/SearchDropdown'
import '../../../semantic/dist/semantic'

Vue.use(VueSemantic)

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
