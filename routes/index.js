'use strict'

const pkg = require('../package')
const router = require('koa-router')()
const glob = require('glob')
const path = require('path')

glob.sync('routes/**/*.js').forEach(function (fileName) {
  if (path.extname(fileName) === '.js' && (fileName !== 'routes/index.js')) {
    var fileNameFullyQualified = path.resolve(fileName)
    router.use(require(fileNameFullyQualified).routes())
  }
})

router.get('/', function *() {
  this.body = { api: pkg.name, version: pkg.version }
})

module.exports = router
