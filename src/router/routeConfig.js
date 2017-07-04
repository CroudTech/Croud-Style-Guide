import ColourPalette from '../components/ColourPalette'
import Fonts from '../components/Fonts'
import Welcome from '../components/Welcome'

export default [
        { path: '/colour', component: ColourPalette },
        { path: '/typography', component: Fonts },
        { path: '/', component: Welcome },
]
