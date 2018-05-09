
import Vue from 'vue'
import ArrowIcon from '../../../src/components/shared/icons/ArrowIcon'

const classes = {}
const props = {}

const Constructor = Vue.extend({
    render(h) {
        return h(ArrowIcon, {
            props,
            class: classes,
        })
    },
})

const vm = new Constructor().$mount()

describe('ArrowIcon', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })

    it('should change direction', () => {
        props.direction = 'left'
        vm.$forceUpdate()
        vm.$nextTick(() => {
            expect(vm.$el).toMatchSnapshot()
        })
    })

    it('should accept classes', () => {
        classes.disabled = true
        vm.$forceUpdate()
        vm.$nextTick(() => {
            expect(vm.$el).toMatchSnapshot()
        })
    })
})
