import axios from 'axios'
import {
  SERVER_URL
} from '../config'

export default {
  addToFavorites (id, success, failure) {
    const token = localStorage.getItem('user-token')
    axios({
      method: 'POST',
      url: SERVER_URL + '/users/favorites',
      data: {
        id
      },
      headers: {
        token
      }
    }).then(res => {
      if (res.status === 200) {
        success(res.data.id)
      }
    }).catch(err => {
      failure(err)
    })
  },
  removeFromFavorites (id, success, failure) {
    const token = localStorage.getItem('user-token')
    axios({
      method: 'DELETE',
      url: SERVER_URL + '/users/favorites',
      data: {
        id
      },
      headers: {
        token
      }
    }).then(res => {
      if (res.status === 200) {
        success(res.data.id)
      }
    }).catch(err => {
      failure(err)
    })
  }
}
