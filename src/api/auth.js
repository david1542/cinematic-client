import axios from 'axios'
import { SERVER_URL } from '../config'
export default {
  register (userDetails, success, failure) {
    axios.post(SERVER_URL + '/users/register', { userDetails }).then(res => {
      if (res.status === 200) {
        const user = res.data
        localStorage.setItem('user-token', user.token) // store the token in localstorage
        success(user)
      } else {
        failure()
      }
    }).catch(err => {
      failure(err)
    })
  },
  login (userDetails, success, failure) {
    axios.post(SERVER_URL + '/users/login', { userDetails }).then(res => {
      if (res.status === 200) {
        const user = res.data
        localStorage.setItem('user-token', user.token) // store the token in localstorage
        success(user)
      } else {
        failure()
      }
    }).catch(err => {
      failure(err)
    })
  },
  logout () {
    return new Promise((resolve, reject) => {
      localStorage.removeItem('user-token')
      localStorage.removeItem('vuex')
      resolve()
    })
  }
}
