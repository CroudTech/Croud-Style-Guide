const fs = require('fs')
const moment = require('moment')
const { exec } = require('child_process')

const lessFilePath = './src/resources/less/variables/all.less'
const semanticFilePath = './semantic/dist/semantic.min.js'
const dateFormat = 'YYYY MM DD HH:mm:ss'
const lastBuilt = moment(fs.statSync(semanticFilePath).mtime, dateFormat)
const lastUpdated = moment(fs.statSync(lessFilePath).mtime, dateFormat)

if (moment(lastUpdated).isAfter(lastBuilt, 'seconds')) {
    exec('yarn run semantic:build')
}
