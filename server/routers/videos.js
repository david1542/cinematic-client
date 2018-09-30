const express = require('express')
const router = express.Router()
const fs = require('fs')
const https = require('https')
const crypto = require('crypto')
const WebTorrent = require('webtorrent')
const torrentSearch = require('torrent-search-api')
const async = require('async')
const OS = require('opensubtitles-api')
const path = require('path')
const srt2vtt = require('srt2vtt')
const streamifier = require('streamifier')
const auth = require('../middlewares/auth')
const config = require('../config')
const utils = require('../utils')
const OpenSubtitles = new OS(config.OPENSUBTITLES_SETTINGS)

// Login to open subtitles api
OpenSubtitles.login()

const connectedUserClients = new Map()

router.get('/subtitles', async function (req, res, next) {
  if (!req.query.filename || !req.query.imdbid) return res.sendStatus(400)

  const options = {
    ...req.query
  }

  if (!options.limit) {
    options.limit = 'all'
  }

  let subtitles
  try {
    subtitles = await OpenSubtitles.search(options)
  } catch (err) {
    return res.sendStatus(500)
  }

  const lang = subtitles[options.langcode]
  const arrayOfNames = lang.map(file => {
    const array = file.filename.split(/[.-]+/)
    array.pop()

    return array
  })

  let highestMatch = 0
  let bestIndex = 0

  arrayOfNames.forEach((nameArr, index) => {
    let counter = 0
    nameArr.forEach(part => {
      if (options.filename.includes(part)) {
        counter++
      }
    })

    if (counter > highestMatch) {
      bestIndex = index
      highestMatch = counter
    } else if (counter === highestMatch) {
      if (lang[index].downloads > lang[bestIndex].downloads) {
        bestIndex = index
        highestMatch = counter
      }
    }
  })

  const match = lang[bestIndex]
  const parts = match.filename.split('.')
  const fileType = '.' + parts[parts.length - 1]
  const fileName = crypto.randomBytes(40).toString('hex')
  const appDir = path.dirname(require.main.filename)
  const remoteDir = appDir + '/tmp/' + fileName + fileType
  const tmpFile = fs.createWriteStream(remoteDir)

  tmpFile.on('open', () => {
    https.get(match.url, response => {
      response.pipe(tmpFile)
    })
  })

  tmpFile.on('finish', () => {
    var data = fs.readFileSync(remoteDir)

    srt2vtt(data, 1255, (err, vttData) => {
      if (err) res.sendStatus(500)
      const outputDir = appDir + '/tmp/' + fileName + '.vtt'

      fs.writeFileSync(outputDir, vttData)

      const subtitlesStream = streamifier.createReadStream(vttData)
      const subtitlesName = parts.slice(0, parts.length - 2).join('.') + '.vtt'
      res.set('Content-Type', 'mime/vtt')
      res.set('Content-Disposition', 'attachment; filename=' + subtitlesName)

      // Sending files to the user
      subtitlesStream.pipe(res)

      // subtitlesStream.on('end', () => {
      //   fs.unlinkSync(appDir + '/tmp' + file.name)
      // })
    })
  })
})

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
  const {
    client
  } = req.client
  const {
    magnet
  } = req.query
  let torrent = client.get(magnet)

  if (!torrent) return res.sendStatus(404)

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
  const {
    client
  } = req.client

  const torrent = client.get(magnet)
  if (torrent) return res.json(magnet)

  client.add(magnet, function (torrent) {
    let file = torrent.files[0]

    for (let i = 1; i < torrent.files.length; i++) {
      if (torrent.files[i].length > file.length) {
        file = torrent.files[i]
      }
    }

    res.json({
      magnet,
      fileName: file.name
    })
  })
})

router.get('/torrents', async function (req, res) {
  if (!req.query.term) return res.sendStatus(400)
  const term = req.query.term

  torrentSearch.enablePublicProviders()
  torrentSearch.enableProvider('ThePirateBay')
  torrentSearch.enableProvider('KickassTorrents')
  torrentSearch.enableProvider('1337x')

  const torrents = torrentSearch.search(term, 'Movies')
  const subtitles = OpenSubtitles.search({
    extensions: ['srt', 'vtt'], // Accepted extensions, defaults to 'srt'.
    imdbid: 'tt5463162', // 'tt528809' is fine too.
    query: term // Text-based query, this is not recommended.
  })

  const result = await Promise.all([torrents, subtitles])
  const filteredTorrents = result[0].filter(torrent => (
    torrent.title.toLowerCase().includes(term.toLowerCase())
  )).sort(function (a, b) {
    if (a.seeds > b.seeds) {
      return -1
    } else {
      return 1
    }
  }).slice(0, 4)

  const availableLangs = Object.keys(result[1]).map(code => {
    const lang = utils.isoLangs[code]
    const name = lang ? lang.nativeName || lang.name : null
    return {
      name,
      code
    }
  })

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

    res.json({
      torrents,
      langs: availableLangs
    })
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
