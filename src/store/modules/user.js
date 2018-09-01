import auth from '../../api/auth'
import { REGISTER_SUCCESS, REGISTER_FAILURE,
  REGISTER_REQUEST, LOGIN_REQUEST, LOGIN_SUCCESS,
  LOGIN_FAILURE } from '../../actions'

const state = {
  user: null,
  registerError: false,
  loginError: false
}

const mutations = {
  [REGISTER_SUCCESS] (state, { user }) {
    state.user = user
  },
  [REGISTER_FAILURE] (state) {
    state.registerError = true
  },
  [LOGIN_SUCCESS] (state, { user }) {
    state.user = user
  },
  [LOGIN_FAILURE] (state) {
    state.loginError = true
  }
}
const actions = {
  [REGISTER_REQUEST] ({ commit }, { payload }) {
    return new Promise((resolve, reject) => {
      auth.register(
        payload.userDetails,
        (user) => {
          debugger
          commit(REGISTER_SUCCESS, { user })
          resolve()
        },
        (err) => {
          debugger
          commit(REGISTER_FAILURE)
          reject(err)
        }
      )
    })
  },
  [LOGIN_REQUEST] ({ commit }, { payload }) {
    return new Promise((resolve, reject) => {
      auth.login(
        payload.userDetails,
        (user) => {
          commit(LOGIN_SUCCESS, { user })
          resolve()
        },
        (err) => {
          commit(LOGIN_FAILURE)
          reject(err)
        }
      )
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
