import Vuex from 'vuex'
import Vue from 'vue'

import colourVariables from '../resources/config/variables/colours.json'
import fontVariables from '../resources/config/variables/fonts.json'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        colourVariables,
        fontVariables,
    },
    getters: {
        colours: state => state.colourVariables,
        fonts: state => state.fontVariables,
    },
})
