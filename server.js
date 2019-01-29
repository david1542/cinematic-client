const express = require('express')
// const path = require('path')
const serveStatic = require('serve-static')
const app = express()

const forceHttps = function (req, res, next) {
  if (process.env.NODE_ENV === 'production') {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect('https://' + req.get('host') + req.url)
    }
  }
  next()
}

app.use(forceHttps)
app.use(serveStatic(__dirname + '/dist')) // eslint-disable-line

const port = process.env.PORT || 5000

app.listen(port)
console.log('server started ' + port)
