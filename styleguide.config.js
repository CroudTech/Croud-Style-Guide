// const loaders = require('vue-webpack-loaders')
// const webpack = require('webpack')
const webpack = require('./build/webpack.dev.conf.js')

module.exports = {
    title: 'Croud Tech Docs',
    showUsage: true,
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
            name: 'Layout',
            components: 'src/components/shared/layout/**/*.vue',
            sections: [
                {
                    name: 'Datatable',
                    components: 'src/components/shared/Datatable.vue',
                },
                {
                    name: 'Modal',
                    content: 'src/components/shared/semantic/semantic-modal.md',
                },
                {
                    name: 'full-calendar',
                    content: 'src/components/shared/layout/fullcalendar.md',
                },
            ],
        },
        {
            name: 'Form Inputs',
            components: 'src/components/shared/forms/**/*.vue',
            sections: [
                {
                    name: 'croud-form-builder',
                    content: 'src/components/shared/forms/croud-forms.md',
                },
                {
                    name: 'Quill',
                    content: 'src/components/shared/forms/quill/quill.md',
                },
                {
                    name: 'Masked Inputs',
                    content: 'src/components/shared/forms/cleave/cleave.md',
                },
                {
                    name: 'Dropdown',
                    content: 'src/components/shared/semantic/semantic-form-dropdown.md',
                },
                {
                    name: 'Checkbox',
                    content: 'src/components/shared/semantic/semantic-checkbox.md',
                },
                {
                    name: 'Radio',
                    content: 'src/components/shared/semantic/semantic-radiobutton.md',
                },
            ],
        },
        {
            name: 'Misc',
            components: 'src/components/shared/misc/**/*.vue',
            sections: [
                {
                    name: 'Headings',
                    content: 'src/components/shared/Headings.md',
                },
                {
                    name: 'Toast',
                    content: 'src/components/shared/forms/toast/toast.md',
                },
            ],
        },
    ],
    require: [
        'jquery',
        './semantic/dist/semantic.min.js',
        './semantic/dist/semantic.min.css',
        'quill/dist/quill.snow.css',
        './src/components/shared/forms/quill/shortcodes.css',
        'fullcalendar/dist/fullcalendar.js',
        'fullcalendar/dist/fullcalendar.css',
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
