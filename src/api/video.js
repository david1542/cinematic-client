import axios from 'axios'
import {
  SERVER_URL
} from '../config'

export default {
  getTorrents (term, success, failure) {
    const token = localStorage.getItem('user-token')
    axios({
      method: 'GET',
      url: SERVER_URL + '/videos/torrents?term=' + term,
      headers: {
        token
      }
    }).then(res => {
      if (res.status === 200) {
        success(res.data)
      }
    }).catch(err => {
      failure(err)
    })
  }
}
