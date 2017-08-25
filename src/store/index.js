import Vuex from 'vuex'
import Vue from 'vue'

import all from '../resources/config/variables/all'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        all,
    },
    getters: {
        boxShadows: state => state.all['box-shadow'],
        colours: state => state.all.colours,
        fonts: state => state.all.fonts,
        layers: state => state.all.layers,
    },
})
