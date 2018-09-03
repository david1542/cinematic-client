const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const cors = require('cors')
const config = require('./config')
const User = require('./models/user')
const auth = require('./middlewares/auth')

mongoose.set('debug', true)
mongoose.connect(config.MONGODB_URI, function (err) {
  if (err) {
    console.log(err)
    process.exit()
  } else {
    console.log('Connected to DB. URI: ' + config.MONGODB_URI)
  }
})

app.use(bodyParser.json())
app.use(cors())

app.get('/', function (req, res) {
  res.send('hello')
})

app.post('/register', function (req, res) {
  if (!req.body.userDetails || !validateUser(req.body.userDetails)) return res.sendStatus(400)

  function validateUser (userDetails) {
    if (!userDetails.email || !userDetails.password ||
      !userDetails.firstName || !userDetails.lastName) {
      return false
    }

    return true
  }

  const { userDetails } = req.body

  User.create(userDetails, function (err, newUser) {
    if (err || !newUser) return res.sendStatus(500)

    res.json(newUser)
  })
})

// login
app.post('/login', function (req, res) {
  if (!req.body.userDetails) return res.sendStatus(400)

  const { email, password } = req.body.userDetails
  User.findOne()
    .where('email').equals(email.toLowerCase())
    .exec(function (err, user) {
      if (err) return res.sendStatus(500)
      if (!user) return res.sendStatus(404)

      bcrypt.compare(password, user.password, function (err, valid) {
        if (err || !valid) return res.sendStatus(404)
        user.token = crypto.randomBytes(60).toString('hex')
        user.save(function (err) {
          if (err) res.sendStatus(500)

          res.json(user)
        })
      })
    })
})

// ------------------------
// Authenticated Routes
// ------------------------
app.post('/favorites', auth.tokenMiddleware, function (req, res) {
  if (!req.body.id) return res.sendStatus(400)
  const { user } = req
  const { id } = req.body

  user.favorites.push(id)
  user.save(function (err, newUser) {
    if (err || !newUser) return res.sendStatus(500)

    res.json({ id })
  })
})

app.delete('/favorites', auth.tokenMiddleware, function (req, res) {
  if (!req.body.id) return res.sendStatus(400)
  const { user } = req
  const { id } = req.body

  User.findByIdAndUpdate(user._id, {
    $pull: {
      'favorites': id
    }
  }).save(function (err, newUser) {
    if (err || !newUser) return res.sendStatus(500)

    res.json({ id })
  })
})

app.listen(4000, function () {
  console.log('Server started on port 4000')
})
