import ColourPalette from '../components/ColourPalette'
import Fonts from '../components/Fonts'
import Welcome from '../components/Welcome'
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
                component: Welcome,
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
                component: Welcome,
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
                component: Welcome,
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
