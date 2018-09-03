const express = require('express')
const router = express.Router()
const WebTorrent = require('webtorrent')
const auth = require('../middlewares/auth')
const connectedUserClients = []

router.use(auth.tokenMiddleware)
router.use(function (req, res, next) {
  let client = connectedUserClients.find(userClient => userClient.userId === req.user._id)

  if (!client) {
    client = createClient(req.user._id)
  }

  req.client = client

  next()
})

function createClient (userId) {
  let client = new WebTorrent()
  let stats = {
    progress: 0,
    downloadSpeed: 0,
    ratio: 0
  }

  let errorMessage = ''

  client.on('error', function (err) {
    errorMessage = err.message
  })

  client.on('download', function (bytes) {
    stats = {
      progress: Math.round(client.progress * 100 * 100) / 100,
      downloadSpeed: client.downloadSpeed,
      ratio: client.ratio
    }
  })

  return {
    userId,
    client,
    stats,
    errorMessage
  }
}

router.get('/', function (req, res) {
  res.render('index')
})

router.get('/add/:magnet', function (req, res) {
  let magnet = req.params.magnet
  const { client } = req.client

  client.add(magnet, function (torrent) {
    let files = []

    torrent.files.forEach(function (data) {
      files.push({
        name: data.name,
        length: data.length
      })
    })
    res.status(200)
    res.json(files)
  })
})

router.get('/stream/:magnet/:file_name', function (req, res) {
  let magnet = req.params.magnet
  const { client } = req.client

  var tor = client.get(magnet)

  let file = {}

  for (let i = 0; i < tor.files.length; i++) {
    if (tor.files[i].name === req.params.file_name) {
      file = tor.files[i]
    }
  }

  let range = req.headers.range

  if (!range) {
    let err = new Error('Wrong range')
    err.status = 416

    res.status(416).json(err)
  }

  let positions = range.replace(/bytes=/, '').split('-')
  let start = parseInt(positions[0], 10)
  let fileSize = file.length

  let end = positions[1] ? parseInt(positions[1], 10) : fileSize - 1
  let chunksize = (end - start) + 1
  let head = {
    'Content-Range': 'bytes ' + start + '-' + end + '/' + fileSize,
    'Accept-Ranges': 'bytes',
    'Content-Length': chunksize,
    'Content-Type': 'video/mp4'
  }

  res.set(206, head)

  let streamPosition = {
    start: start,
    end: end
  }

  let stream = file.createReadStream(streamPosition)

  stream.pipe(res)
  stream.on('error', function (err) {
    return res.status(500).json(err)
  })
})

router.get('/list', function (req, res, next) {
  const { client } = req.client
  let torrent = client.torrents.reduce(function (array, data) {
    array.push({
      hash: data.infoHash
    })
    return array
  }, [])

  res.status(200)
  res.json(torrent)
})

router.get('/stats', function (req, res, next) {
  const { stats } = req.client
  res.status(200)
  res.json(stats)
})

router.get('/errors', function (req, res, next) {
  const { errorMessage } = req.client
  res.status(200)
  res.json(errorMessage)
})

router.delete('/delete/:magnet', function (req, res, next) {
  let magnet = req.params.magnet
  const { client } = req.client

  client.remove(magnet, function () {
    res.status(200)
    res.end()
  })
})

module.exports = router
