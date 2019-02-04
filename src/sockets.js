
import io from 'socket.io-client'
import config from './config'
import store from './store'
import { setMovieData } from './actions/creators'
import EventBus from './eventBus'

const initialize = () => new Promise((resolve, reject) => {
  const socket = io(config.SERVER_URL)

  socket.on('connect', () => {
    // Send socket authentication request using the token from the localStorage
    const token = localStorage.getItem('user-token')
    socket.emit('authentication', { token })

    socket.on('authenticated', () => {
      EventBus.$emit('authenticated')

      console.log('Socket is authenticated')
      resolve()
      // Authenticated. We can now listen for actual events
      socket.on('torrents', (data) => {
        store.dispatch(setMovieData(data))
      })
    })

    socket.on('unauthorized', () => {
      reject(new Error('Unauthorized'))
      // Invalidate User
    })
  })
})

export default initialize
