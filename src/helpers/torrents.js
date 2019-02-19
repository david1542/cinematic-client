import WebTorrent from 'webtorrent-hybrid'
import EventBus from '@/eventBus'

class TorrentManager {
  constructor () {
    this.torrentClient = null

    this.createClient = this.createClient.bind(this)
    this.destroyClient = this.destroyClient.bind(this)
    this.findTorrent = this.findTorrent.bind(this)
    this.initialize = this.initialize.bind(this)
  }

  initialize () {
    return this.createClient()
  }

  createClient () {
    return new Promise((resolve, reject) => {
      let client = new WebTorrent()
      let stats = {
        progress: 0,
        downloadSpeed: 0,
        ratio: 0
      }

      let errorMessage = ''

      client.on('error', (err) => {
        errorMessage = err.message
      })

      client.on('torrent', () => {
        this.torrentClient.status = 'downloading'
        console.log('Torrent added')
      })

      client.on('download', (bytes) => {
        stats = {
          progress: Math.round(client.progress * 100 * 100) / 100,
          downloadSpeed: client.downloadSpeed,
          ratio: client.ratio
        }

        EventBus.$emit('torrent-download', stats)
      })

      const torrentClient = {
        client,
        errorMessage
      }

      this.torrentClient = torrentClient

      console.log('Created new web torrent client')
      resolve()
    })
  }

  findTorrent (magnet) {
    return new Promise(async (resolve, reject) => {
      const { client } = this.torrentClient
      let torrent = client.get(magnet)

      if (!torrent) {
        torrent = await this.addTorrent(magnet)
        resolve(torrent)
      } else {
        resolve(torrent)
      }
    })
  }

  addTorrent (magnet) {
    return new Promise((resolve) => {
      const {
        client
      } = this.torrentClient

      const torrent = client.get(magnet)
      if (torrent) {
        torrent.resume()
        resolve(torrent)
      } else {
        client.add(magnet, (addedTorrent) => {
          if (addedTorrent.downloaded === addedTorrent.length) {
            this.torrentClient.status = 'completed'
          }
          resolve(addedTorrent)
        })
      }
    })
  }

  stream (magnet) {
    return new Promise(async (resolve) => {
      const torrent = await this.findTorrent(magnet)

      let file = torrent.files[0]

      for (let i = 1; i < torrent.files.length; i++) {
        if (torrent.files[i].length > file.length) {
          file = torrent.files[i]
        }
      }

      resolve(file)
    })
  }

  pause (magnet) {
    return new Promise((resolve, reject) => {
      const { client } = this.torrentClient

      try {
        client.remove(magnet, (err) => {
          if (err) throw new Error(err)

          resolve()
        })
      } catch (err) {
        reject(err)
      }
    })
  }

  destroyClient () {
    this.torrentClient.client.destroy()
    console.log('Destroyed torrent client')
  }
}

export default new TorrentManager()
