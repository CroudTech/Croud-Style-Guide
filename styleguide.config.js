// const loaders = require('vue-webpack-loaders')
// const webpack = require('webpack')
const webpack = require('./build/webpack.dev.conf.js')

module.exports = {
    components: 'src/components/shared/**/*.vue',
    require: [
        'jquery',
        'semantic-ui/dist/semantic.min',
        'semantic-ui/dist/semantic.min.css',
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
