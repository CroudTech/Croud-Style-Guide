var merge = require('webpack-merge')
var devEnv = require('./dev.env')
var $ = require('jquery')

global.$ = global.jQuery = $;

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"'
})
