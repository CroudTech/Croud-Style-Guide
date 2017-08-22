import variables from '../resources/config/variables/all'
import config from '../resources/build/build.config'
import Introduction from '../components/Introduction'
import CatagoryHeading from '../components/CatagoryHeading'

const varRoots = Object.keys(variables)
.filter(varCat => config.sassMaps.inclusions.indexOf(varCat) >= 0)
.map(varCat => ({
    name: varCat.toLowerCase(),
    path: `${varCat}`,
    // eslint-disable-next-line
    component: require(`../components/vars/${varCat.toLowerCase().replace('-', '')}`),
}))

export default [
    {
        path: '',
        redirect: '/introduction',
    },
    {
        title: 'introduction',
        path: '/introduction',
        component: CatagoryHeading,
        props: {
            catagory: 'Introduction',
        },
        children: [
            {
                name: 'introduction',
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
                component: Introduction,
            },
            {
                name: 'principles',
                path: 'principles',
                component: Introduction,
            },
        ],
    },
    {
        title: 'style',
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
            ...varRoots,
        ],
    },
    {
        title: 'components',
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
