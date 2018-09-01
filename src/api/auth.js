import axios from 'axios'
import { SERVER_URL } from '../config'

export default {
  register (userDetails, success, failure) {
    axios.post(SERVER_URL + '/register', userDetails).then(res => {
      if (res.status === 200) {
        success(res.data)
      } else {
        failure()
      }
    }).catch(err => {
      failure(err)
    })
  }
}
