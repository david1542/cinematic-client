const express = require('express')
const router = express.Router()
const WebTorrent = require('webtorrent')
const torrentSearch = require('torrent-search-api')
const async = require('async')
const auth = require('../middlewares/auth')
const connectedUserClients = new Map()

router.use(auth.tokenMiddleware)
router.use(function (req, res, next) {
  let client = connectedUserClients.get(String(req.user._id))

  if (!client) {
    client = createClient(req.user._id)
    connectedUserClients.set(String(client.userId), client)
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
    console.log(stats)
  })

  return {
    userId,
    client,
    stats,
    errorMessage
  }
}

router.get('/stream', function (req, res) {
  const { client } = req.client
  const { magnet } = req.query
  let torrent = client.get(magnet)

  let file = torrent.files[0]

  for (let i = 1; i < torrent.files.length; i++) {
    if (torrent.files[i].length > file.length) {
      file = torrent.files[i]
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

  res.writeHead(206, head)

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

router.post('/add/:magnet', function (req, res) {
  let magnet = req.params.magnet
  const { client } = req.client

  const torrent = client.get(magnet)
  if (torrent) return res.json(magnet)

  client.add(magnet, function () {
    res.json(magnet)
  })
})

router.get('/torrents', async function (req, res) {
  if (!req.query.term) return res.sendStatus(400)
  const term = req.query.term

  torrentSearch.enablePublicProviders()
  torrentSearch.enableProvider('ThePirateBay')
  torrentSearch.enableProvider('KickassTorrents')
  torrentSearch.enableProvider('1337x')

  const torrents = await torrentSearch.search(term, 'Movies')
  const filteredTorrents = torrents.filter(torrent => (
    torrent.title.toLowerCase().includes(term.toLowerCase())
  )).sort(function (a, b) {
    if (a.seeds > b.seeds) {
      return -1
    } else {
      return 1
    }
  }).slice(0, 4)

  if (!filteredTorrents) {
    return res.sendStatus(500)
  }

  async.map(filteredTorrents, function (torrent, callback) {
    torrentSearch.getMagnet(torrent).then(function (magnet) {
      const infoHash = magnet.split('&')[0].split(':')[3]
      torrent.infoHash = infoHash
      callback(null, torrent)
    })
  }, function (err, torrents) {
    if (err) return res.sendStatus(500)

    res.json(torrents)
  })
})

router.get('/list', function (req, res, next) {
  const {
    client
  } = req.client
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
  const {
    stats
  } = req.client
  res.status(200)
  res.json(stats)
})

router.get('/errors', function (req, res, next) {
  const {
    errorMessage
  } = req.client
  res.status(200)
  res.json(errorMessage)
})

router.delete('/delete/:magnet', function (req, res, next) {
  let magnet = req.params.magnet
  const {
    client
  } = req.client

  client.remove(magnet, function () {
    res.status(200)
    res.end()
  })
})

module.exports = router
