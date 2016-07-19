'use strict'

const app = require('./app')
const pkg = require('./package')


const PORT = process.env.PORT || 5000

const server = app.listen(PORT, function () {
  const port = server.address().port

  console.log(`${pkg.name} version ${pkg.version} listening on port ${port}`)
})
