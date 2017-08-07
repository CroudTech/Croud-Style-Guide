module.exports = {
    input: '../config/variables/',
    output: '../',
    prefix: 'croud-',
    preprocessors: {
        sass: {
            file: {
                prefix: '_',
                extension: 'scss',
            },
            variable: {
                prefix: '$',
            },
        },
        less: {
            file: {
                extension: 'less',
            },
            variable: {
                prefix: '@',
            },
        },
    },
    importOrder: [
        '../config/variables/colours.json',
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
        inclusions: [
            'colours',
            'fonts',
            'motion',
        ],
    },
}
