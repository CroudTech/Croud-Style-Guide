import ColourPalette from '../components/ColourPalette'
import Fonts from '../components/Fonts'
import Introduction from '../components/Introduction'
import Principles from '../components/Principles'
import CatagoryHeading from '../components/CatagoryHeading'

export default [
    {
        name: 'introduction',
        path: '/',
        component: CatagoryHeading,
        props: {
            catagory: 'Introduction',
        },
        children: [
            {
                name: 'introduction-default',
                path: '',
                component: Introduction,
                props: {
                    introText: `Hello! Welcome to the Croud style guide
                     - a living document of design rules and reusable UI components, 
                     to be used and referenced across front-end projects.`,
                },
            },
            {
                name: 'motivation',
                path: 'motivation',
                component: Principles,
            },
            {
                name: 'principles',
                path: 'principles',
                component: Principles,
            },
        ],
    },
    {
        name: 'style',
        path: '/style',
        component: CatagoryHeading,
        props: {
            catagory: 'Style',
        },
        children: [
            {
                name: 'style-default',
                path: '',
                component: Introduction,
            },
            {
                name: 'colour',
                path: 'colour',
                component: ColourPalette,
            },
            {
                name: 'typography',
                path: 'typography',
                component: Fonts,
            },
        ],
    },
    {
        name: 'Components',
        path: '/components',
        component: CatagoryHeading,
        props: {
            catagory: 'components',
        },
        children: [
            {
                name: 'components-default',
                path: '',
                component: Introduction,
            },
            {
                name: 'menus',
                path: 'menus',
            },
            {
                name: 'buttons',
                path: 'buttons',
            },
        ],
    },
]
