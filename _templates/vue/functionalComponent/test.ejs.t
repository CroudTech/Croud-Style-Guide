---
to: test/unit/<%= dir %>/<%= name %>.spec.js
---

import Vue from 'vue'
import <%= name %> from '../../../src/components/shared/<%= dir %>/<%= name %>'

const Constructor = Vue.extend({
    render(h) {
        return h(<%= name %>, {
            props: {},
        })
    },
})

const vm = new Constructor().$mount()

describe('<%= name %>', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})
