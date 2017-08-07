import Vue from 'vue'
import TabMenu from '../../../src/components/shared/menus/TabMenu'

const Constructor = Vue.extend(TabMenu)

const vm = new Constructor({
    propsData: {
        active: 'Journal',
        menuItems: [
            {
                name: 'Planning',
                component: 'PlanningComponent',
            },
            {
                name: 'Journal',
                component: 'JournalComponent',
            },
            {
                name: 'Calander',
                component: 'CalanderComponent',
            },
        ],
    },
}).$mount()

describe('Tab Menu', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
