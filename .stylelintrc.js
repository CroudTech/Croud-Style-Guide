module.exports = {
    extends: ['stylelint-config-recommended'],
    processors: ['@mapbox/stylelint-processor-arbitrary-tags'],
    rules: {
        'no-empty-source': null,
    }
}