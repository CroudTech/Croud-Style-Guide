import ColourPalette from '../components/ColourPalette'
import Fonts from '../components/Fonts'
import Welcome from '../components/Welcome'

export default [
        { path: '/colour', component: ColourPalette, name: 'colour' },
        { path: '/typography', component: Fonts, name: 'typography' },
        { path: '/', component: Welcome },
]
