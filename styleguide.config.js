// const loaders = require('vue-webpack-loaders')
// const webpack = require('webpack')
const webpack = require('./build/webpack.dev.conf.js')

module.exports = {
    // components: 'src/components/shared/**/*.vue',
    sections: [
        {
            name: 'Buttons',
            components: 'src/components/shared/buttons/**/*.vue',
        },
        {
            name: 'Menus',
            components: 'src/components/shared/menus/**/*.vue',
        },
        {
            name: 'Misc',
            components: 'src/components/shared/misc/**/*.vue',
        },
        {
            name: 'Layout',
            components: 'src/components/shared/layout/**/*.vue',
        },
        {
            name: 'Form Inputs',
            components: 'src/components/shared/forms/**/*.vue',
        },
        {
            name: 'Datatable',
            components: 'src/components/shared/Datatable.vue',
        },
        {
            name: 'Quill',
            content: 'src/components/shared/forms/quill/quill.md',
        },
    ],
    require: [
        'jquery',
        './semantic/dist/semantic.min.js',
        './semantic/dist/semantic.min.css',
        'quill/dist/quill.snow.css',
        './src/components/shared/forms/quill/shortcodes.css',
    ],
    // webpackConfig: {
    //     module: {
    //         loaders,
    //     },
    //     plugins: [
    //         new webpack.ProvidePlugin({
    //             $: 'jquery',
    //             jQuery: 'jquery',
    //             'window.jQuery': 'jquery',
    //         }),
    //     ],
    // },
    webpackConfig: webpack,
    styleguideDir: 'docs/technical',
    mixins: [
        'src/mixins/styleguidist.js',
    ],
}
