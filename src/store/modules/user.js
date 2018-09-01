import auth from '../../api/auth'
import { REGISTER_SUCCESS, REGISTER_FAILURE,
  REGISTER_REQUEST, LOGIN_REQUEST, LOGIN_SUCCESS,
  LOGIN_FAILURE, LOGOUT_REQUEST } from '../../actions'

const state = {
  user: null,
  registerError: false,
  loginError: false,
  token: localStorage.getItem('user-token') || ''
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
    state.token = user.token
  },
  [LOGIN_FAILURE] (state) {
    state.loginError = true
  },
  [LOGOUT_REQUEST] (state) {
    state.user = null
    state.token = null
    state.loginError = false
    state.registerError = false
  }
}

const getters = {
  isAuthenticated: state => !!state.token
}

const actions = {
  [REGISTER_REQUEST] ({ commit }, { payload }) {
    return new Promise((resolve, reject) => {
      auth.register(
        payload.userDetails,
        (user) => {
          debugger
          commit(REGISTER_SUCCESS, { user })
          localStorage.setItem('user-token', user.token) // store the token in localstorage
          resolve()
        },
        (err) => {
          debugger
          commit(REGISTER_FAILURE)
          localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
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
  },
  [LOGOUT_REQUEST] ({ commit }) {
    return new Promise((resolve, reject) => {
      auth.logout().then(() => {
        commit(LOGOUT_REQUEST)
        localStorage.removeItem('user-token')
        resolve()
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
