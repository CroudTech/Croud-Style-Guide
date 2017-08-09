import Vue from 'vue'
import Loader from '../../../src/components/shared/misc/ProfileHeader'
import '../../../semantic/dist/semantic'

Vue.use(require('croud-vue-semantic'))
Vue.component('CroudImageUploader', require('../../../src/components/shared/misc/ImageUploader'))
Vue.component('CroudAvatar', require('../../../src/components/shared/misc/Avatar'))

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
