import Vuex from 'vuex'
import Vue from 'vue'

import variables from '../resources/variables.json'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        variables,
    },
    getters: {
        colours: state => state.variables.colours,
        fonts: state => state.variables.fonts,
    },
})
