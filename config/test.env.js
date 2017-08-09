var merge = require('webpack-merge')
var devEnv = require('./dev.env')
var $ = require('jquery')

global.$ = global.jQuery = $
global.gateway_url = 'test'

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"'
})
