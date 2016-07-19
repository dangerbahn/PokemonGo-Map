'use strict'

const app = require('koa')()
const router = require('koa-router')()
const cors = require('koa-cors')
const jsonp = require('koa-jsonp')


/*
 * JSONP
 */
app.use(jsonp({ callbackName: 'callback'}))

/*
 * CORS
 */
app.use(cors( {origin: true, headers: 'Content-Type'}));

/*
 * Endpoints installed into parent router
 */
router.use(require('./routes').routes())

/*
 * Install parent router
 */
app.use(router.routes())

/*
 * Export the app
 */
module.exports = app
