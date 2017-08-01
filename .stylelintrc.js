module.exports = {
    extends: ['stylelint-config-recommended'],
    processors: ['@mapbox/stylelint-processor-arbitrary-tags'],
    plugins: ['stylelint-declaration-use-variable'],
    rules: {
        'no-empty-source': null,
        'rule-empty-line-before': 'always',
        'selector-max-id': [0, {
            message: 'Shouldn\'t be using id selectors',
        }], 
        'font-weight-notation': 'numeric',
        "sh-waqar/declaration-use-variable": [
            [
                'font-family',
                'font-size',
                'color',
                'background-color',
                'background',
                'z-index',
            ]
        ],
    },
}