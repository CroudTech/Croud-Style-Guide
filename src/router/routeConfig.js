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
                    introText: `Hello! Welcome to the Croud style guide - a living document of design rules and reusable UI components, 
                    to be used and referenced across front-end projects. Preprocessor variables are displayed in the style section of 
                    the style guide. For documentation on reusable components, please visit the technical documentation.`,
                },
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
                props: {
                    fileName: 'all',
                    introText: `The style section contains information on the preprocessor variables stored in the style guide.
                     To make them simple to use in your project you can copy the full sass import path. You can also copy the 
                     name of the variables by simply clicking on the specific variable example.`,
                },
            },
            ...varRoots,
        ],
    },
]
