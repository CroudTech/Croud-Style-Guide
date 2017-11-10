import Vue from 'vue'
import VueSemantic from 'croud-vue-semantic'
import ImageUploader from '../../../src/components/shared/misc/ImageUploader'
import '../../../semantic/dist/semantic'

Vue.use(VueSemantic)

const Constructor = Vue.extend(ImageUploader)

const vm = new Constructor().$mount()

describe('Image Uploader', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
