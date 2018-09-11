import movie from '@/api/movie'
import { FETCH_POPULAR_MOVIES, FETCH_POPULAR_MOVIES_SUCCESS,
  FETCH_POPULAR_MOVIES_FAILURE, FETCH_SPECIFIC_MOVIE,
  FETCH_SPECIFIC_MOVIE_SUCCESS, FETCH_SPECIFIC_MOVIE_FAILURE,
  RESET_SPECIFIC_MOVIE, SEARCH_TERM, SEARCH_TERM_SUCCESS,
  SEARCH_TERM_FAILURE, SEARCH_TORRENTS, SEARCH_TORRENTS_SUCCESS,
  SEARCH_TORRENTS_FAILURE, RESET_TORRENTS, ADD_TORRENT,
  ADD_TORRENT_SUCCESS, ADD_TORRENT_FAILURE, GET_MOVIES } from '../../actions'

const state = {
  popularMovies: null,
  popularMoviesError: null,
  specificMovie: null,
  specificMovieError: null
}

const mutations = {
  [FETCH_POPULAR_MOVIES_SUCCESS] (state, { movies }) {
    state.popularMovies = movies
  },
  [FETCH_POPULAR_MOVIES_FAILURE] (state, { err }) {
    state.popularMoviesError = err
  },
  [FETCH_SPECIFIC_MOVIE_SUCCESS] (state, { movie }) {
    state.specificMovie = movie
  },
  [FETCH_SPECIFIC_MOVIE_FAILURE] (state, { err }) {
    state.specificMovieError = err
  },
  [RESET_SPECIFIC_MOVIE] (state) {
    state.specificMovie = null
  },
  [SEARCH_TERM_SUCCESS] (state, { movies }) {
    state.searchMovies = movies
  },
  [SEARCH_TERM_FAILURE] (state, { err }) {
    state.searchTermError = err
  },
  [RESET_TORRENTS] (state) {
    state.torrents = null
  },
  [SEARCH_TORRENTS_SUCCESS] (state, { torrents }) {
    state.torrents = torrents
  },
  [SEARCH_TORRENTS_FAILURE] (state, { err }) {
    state.torrentsError = err
  },
  [ADD_TORRENT_SUCCESS] (state, { hash }) {
    state.selectedHash = hash
  },
  [ADD_TORRENT_FAILURE] (state, { err }) {
    state.selectedHashError = err
  }
}

const actions = {
  [GET_MOVIES] (store, { payload }) {
    return new Promise((resolve, reject) => {
      movie.getMovies(
        payload.ids,
        (movies) => resolve(movies),
        (err) => reject(err)
      )
    })
  },
  [ADD_TORRENT] ({ commit }, { payload }) {
    return new Promise((resolve, reject) => {
      movie.addTorrent(
        payload.hash,
        (hash) => {
          commit(ADD_TORRENT_SUCCESS, { hash })
          resolve(hash)
        },
        (err) => {
          commit(ADD_TORRENT_FAILURE, { err })
          reject(err)
        }
      )
    })
  },
  [FETCH_POPULAR_MOVIES] ({ commit }) {
    return new Promise((resolve, reject) => {
      movie.getPopularMovies(
        (movies) => {
          commit(FETCH_POPULAR_MOVIES_SUCCESS, { movies })
          resolve(movies)
        },
        (err) => {
          commit(FETCH_POPULAR_MOVIES_FAILURE, { err })
          reject(err)
        }
      )
    })
  },
  [FETCH_SPECIFIC_MOVIE] ({ commit, dispatch }, { payload }) {
    commit(RESET_SPECIFIC_MOVIE)
    commit(RESET_TORRENTS)
    return new Promise((resolve, reject) => {
      movie.getSpecificMovie(
        payload.id,
        (movie) => {
          commit(FETCH_SPECIFIC_MOVIE_SUCCESS, { movie })
          dispatch(SEARCH_TORRENTS, { title: movie.original_title })
          resolve(movie)
        },
        (err) => {
          commit(FETCH_SPECIFIC_MOVIE_FAILURE, { err })
          reject(err)
        }
      )
    })
  },
  [SEARCH_TORRENTS] ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      movie.getTorrents(
        payload.title,
        (torrents) => {
          commit(SEARCH_TORRENTS_SUCCESS, { torrents })
          resolve(torrents)
        },
        (err) => {
          commit(SEARCH_TORRENTS_FAILURE, { err })
          reject(err)
        }
      )
    })
  },
  [SEARCH_TERM] ({ commit }, { payload }) {
    return new Promise((resolve, reject) => {
      movie.search(
        payload.term,
        (movies) => {
          commit(SEARCH_TERM_SUCCESS, { movies })
          resolve(movies)
        },
        (err) => {
          commit(SEARCH_TERM_FAILURE, { err })
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
//   getters
}
