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
            comment: {
                syntax: '//',
            },
        },
        less: {
            file: {
                extension: 'less',
            },
            variable: {
                prefix: '@',
            },
            comment: {
                syntax: '//',
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
}
