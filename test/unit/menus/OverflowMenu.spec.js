import Vue from 'vue'
import OverflowMenu from '../../../src/components/shared/menus/OverflowMenu'
import '../../../semantic/dist/semantic'

const Constructor = Vue.extend(OverflowMenu)

const vm = new Constructor({
    propsData: {
        options: [
            {
                name: 'Delete',
                method: () => {},
            },
            {
                name: 'Postpone',
                method: () => {},
            },
            {
                name: 'Copy',
                method: () => {},
                disabled: true,
            },
        ],
    },
}).$mount()

describe('OverflowMenu', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
