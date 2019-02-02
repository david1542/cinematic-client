import axios from 'axios'
import {
  SERVER_URL
} from '../config'

export default {
  getMyUser (success, failure) {
    const token = localStorage.getItem('user-token')

    axios({
      method: 'GET',
      url: SERVER_URL + '/users/me',
      headers: {
        token
      }
    }).then(res => {
      success(res.data)
    }).catch(err => {
      failure(err)
    })
  },
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
