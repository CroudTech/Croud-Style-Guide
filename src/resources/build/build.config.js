module.exports = {
    input: '../config/variables/',
    output: '../',
    prefix: 'croud-',
    preprocessors: {
        sass: {
            name: 'sass',
            file: {
                prefix: '_',
                extension: 'scss',
            },
            variable: {
                prefix: '$',
            },
        },
        less: {
            name: 'less',
            file: {
                extension: 'less',
            },
            variable: {
                prefix: '@',
            },
        },
    },
    importOrder: [
        'colours',
    ],
    additions: {
        fonts: {
            sass: [
                '@import "../../fontImports";',
            ],
            less: [
                '@import "../../fontImports.css";',
            ],
        },
    },
    sassMaps: {
        exclusions: [
            'box-shadow',
            'layers',
        ],
    },
}
