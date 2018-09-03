import auth from '@/api/auth'
import user from '@/api/user'
import { REGISTER_SUCCESS, REGISTER_FAILURE,
  REGISTER_REQUEST, LOGIN_REQUEST, LOGIN_SUCCESS,
  LOGIN_FAILURE, LOGOUT_REQUEST, ADD_TO_FAVORITES,
  ADD_TO_FAVORITES_SUCCESS, ADD_TO_FAVORITES_FAILURE,
  REMOVE_FROM_FAVORITES, REMOVE_FROM_FAVORITES_SUCCESS,
  REMOVE_FROM_FAVORITES_FAILURE } from '../../actions'

const state = {
  user: null,
  registerError: false,
  loginError: false,
  addToFavoritesError: false,
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
  },
  [ADD_TO_FAVORITES_SUCCESS] (state, { id }) {
    state.user.favorites.push(id)
  },
  [ADD_TO_FAVORITES_FAILURE] (state) {
    state.addToFavoritesError = true
  },
  [REMOVE_FROM_FAVORITES_SUCCESS] (state, { id }) {
    state.user.favorites = state.user.favorites.filter(movieId => movieId !== id)
  },
  [REMOVE_FROM_FAVORITES_FAILURE] (state) {
    state.addToFavoritesError = true
  }
}

const getters = {
  isAuthenticated: state => !!state.token,
  isMovieInFavorites: state => id => state.user.favorites.some(movieId => movieId === id)
}

const actions = {
  [REGISTER_REQUEST] ({ commit }, { payload }) {
    return new Promise((resolve, reject) => {
      auth.register(
        payload.userDetails,
        (user) => {
          commit(REGISTER_SUCCESS, { user })
          resolve()
        },
        (err) => {
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
  },
  [LOGOUT_REQUEST] ({ commit }) {
    return new Promise((resolve, reject) => {
      auth.logout().then(() => {
        commit(LOGOUT_REQUEST)
        resolve()
      })
    })
  },
  [ADD_TO_FAVORITES] ({ commit }, { payload }) {
    return new Promise((resolve, reject) => {
      user.addToFavorites(
        payload.id,
        (id) => {
          commit(ADD_TO_FAVORITES_SUCCESS, { id })
          resolve(id)
        },
        (err) => {
          commit(ADD_TO_FAVORITES_FAILURE, { err })
          reject(err)
        }
      )
    })
  },
  [REMOVE_FROM_FAVORITES] ({ commit }, { payload }) {
    return new Promise((resolve, reject) => {
      user.removeFromFavorites(
        payload.id,
        (id) => {
          commit(REMOVE_FROM_FAVORITES_SUCCESS, { id })
          resolve(id)
        },
        (err) => {
          commit(REMOVE_FROM_FAVORITES_FAILURE, { err })
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
  actions,
  getters
}
