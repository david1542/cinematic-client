import axios from 'axios'
import {
  SERVER_URL
} from '../config'

const token = localStorage['user-token']
export default {
  addToFavorites (id, success, failure) {
    axios({
      method: 'POST',
      url: SERVER_URL + '/favorites',
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
    axios({
      method: 'DELETE',
      url: SERVER_URL + '/favorites',
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
