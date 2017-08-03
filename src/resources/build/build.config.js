module.exports = {
    input: '../config/variables/',
    output: '../',
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
            'layers',
        ],
    },
}
