import auth from '@/api/auth'
import user from '@/api/user'
import sockets from '@/sockets'
import { REGISTER_SUCCESS, REGISTER_FAILURE,
  REGISTER_REQUEST, LOGIN_REQUEST, LOGIN_SUCCESS,
  LOGIN_FAILURE, LOGOUT_REQUEST, ADD_TO_FAVORITES,
  ADD_TO_FAVORITES_SUCCESS, ADD_TO_FAVORITES_FAILURE,
  REMOVE_FROM_FAVORITES, REMOVE_FROM_FAVORITES_SUCCESS,
  REMOVE_FROM_FAVORITES_FAILURE, FETCH_USER, INITIATE_SOCKET } from '../../actions'
import router from '@/router'

const state = {
  user: null,
  registerError: false,
  loginError: false,
  addToFavoritesError: false,
  token: localStorage.getItem('user-token') || null
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
    state.user.favorites = state.user.favorites.filter(movieId => String(movieId) !== String(id))
  },
  [REMOVE_FROM_FAVORITES_FAILURE] (state) {
    state.addToFavoritesError = true
  }
}

const getters = {
  isAuthenticated: state => !!state.token,
  getUsername: state => state.user && state.user.firstName,
  isMovieInFavorites: state => {
    return id => {
      return state.user && state.user.favorites.some(movieId => String(movieId) === String(id))
    }
  }
}

const actions = {
  [INITIATE_SOCKET] () {
    return sockets()
  },
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
  [LOGIN_REQUEST] ({ commit, dispatch }, { payload }) {
    return new Promise((resolve, reject) => {
      auth.login(
        payload.userDetails,
        (user) => {
          dispatch(INITIATE_SOCKET)
            .then(() => {
              commit(LOGIN_SUCCESS, { user })
              resolve(user)
            })
            .catch(reject)
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
        router.push({ name: 'LoginPage' })
        commit(LOGOUT_REQUEST)
        resolve()
      })
    })
  },
  [FETCH_USER] ({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      user.getMyUser(user => {
        dispatch(INITIATE_SOCKET)
          .then(() => {
            commit(LOGIN_SUCCESS, { user })
            resolve(user)
          })
          .catch(reject)
      }, err => {
        reject(err)
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
