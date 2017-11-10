import Vue from 'vue'
import VueSemantic from 'croud-vue-semantic'
import SupercroudSelector from '../../../src/components/shared/misc/SupercroudSelector'
import '../../../semantic/dist/semantic'

Vue.use(VueSemantic)

const Constructor = Vue.extend(SupercroudSelector)

const vm = new Constructor({
    propsData: {
        teamsArray: [
            { name: 'Supercroud',
                users: [
                    { id: 1, name: 'Joe Blogs' },
                    { id: 2, name: 'John Doe' },
                    { id: 3, name: 'Jason Bourne' },
                ],
            },
        ],
        options: [
            { id: 4, name: 'Jack Overdue' },
        ],
        currentUserId: 1,
    },
}).$mount()

describe('Supercroud selector', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })

    it('shouldn\'t duplicate current user in team', () => {
        expect(vm.teams.Supercroud.length).toBe(2)
        expect(vm.teams.Supercroud.map(u => u.id)).not.toContain(vm.currentUserId)
    })

    it('should add non current users to filtered options', () => {
        expect(vm.filteredOptions.map(u => u.id)).toContain(vm.options[0].id)
    })
})
