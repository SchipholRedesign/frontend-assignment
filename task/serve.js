/**
 * node task/serve dist 8383
 */

const express     = require('express')
const serveStatic = require('serve-static')
const root = process.argv[2]||'doc'
const port = process.argv[3]||8183
const dontOpen = process.argv.join(' ').includes(' -s')||false
const openBrowser = !dontOpen&&require('open')

express()
  .use(serveStatic(`./${root}/`))
  .get('*', (request, response) => {
    response.sendFile('index.html', {root: `${__dirname}/../${root}/`})
  })
  .listen(port)

openBrowser&&openBrowser('http://localhost:'+port)