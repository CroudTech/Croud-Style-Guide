import Vue from 'vue'
import VueSemantic from 'croud-vue-semantic'
import Loader from '../../../src/components/shared/misc/ProfileHeader'
import CroudImageUploader from '../../../src/components/shared/misc/ImageUploader'
import CroudAvatar from '../../../src/components/shared/misc/Avatar'
import '../../../semantic/dist/semantic'

Vue.use(VueSemantic)
Vue.component('CroudImageUploader', CroudImageUploader)
Vue.component('CroudAvatar', CroudAvatar)

const Constructor = Vue.extend(Loader)

const vm = new Constructor({
    propsData: {
        user: {
            name: 'test',
            first_name: 'test',
            last_name: 'test',
            avatar: '',
            email: 'test',
        },
        readOnly: false,
    },
}).$mount()

describe('Profile header', () => {
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
