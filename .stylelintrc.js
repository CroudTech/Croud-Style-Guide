module.exports = {
    extends: ['stylelint-config-recommended'],
    processors: ['@mapbox/stylelint-processor-arbitrary-tags'],
    plugins: ['stylelint-declaration-use-variable'],
    rules: {
        'no-empty-source': null,
        'rule-empty-line-before': 'always',
        "sh-waqar/declaration-use-variable": [
            'font-family',
        ],
    },
}