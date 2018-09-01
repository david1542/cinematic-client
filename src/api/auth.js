import axios from 'axios'
import { SERVER_URL } from '../config'

export default {
  register (userDetails, success, failure) {
    axios.post(SERVER_URL + '/register', { userDetails }).then(res => {
      if (res.status === 200) {
        const user = res.data
        axios.defaults.headers.common['Authorization'] = user.token
        success(user)
      } else {
        failure()
      }
    }).catch(err => {
      failure(err)
    })
  },
  login (userDetails, success, failure) {
    axios.post(SERVER_URL + '/login', { userDetails }).then(res => {
      if (res.status === 200) {
        success(res.data)
      } else {
        failure()
      }
    }).catch(err => {
      failure(err)
    })
  },
  logout () {
    return new Promise((resolve, reject) => {
      delete axios.defaults.headers.common['Authorization']
      resolve()
    })
  }
}
