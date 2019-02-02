import Vue from 'vue'
import movie from '@/api/movie'
import { FETCH_POPULAR_MOVIES, FETCH_POPULAR_MOVIES_SUCCESS,
  FETCH_POPULAR_MOVIES_FAILURE, FETCH_SPECIFIC_MOVIE,
  FETCH_SPECIFIC_MOVIE_SUCCESS, FETCH_SPECIFIC_MOVIE_FAILURE,
  RESET_SPECIFIC_MOVIE, SEARCH_TERM, SEARCH_TERM_SUCCESS,
  SEARCH_TERM_FAILURE, SEARCH_TORRENTS, SEARCH_TORRENTS_SUCCESS,
  SEARCH_TORRENTS_FAILURE, RESET_TORRENTS, ADD_TORRENT,
  ADD_TORRENT_SUCCESS, ADD_TORRENT_FAILURE, GET_MOVIES,
  GET_MOVIES_CATEGORIES, GET_MOVIES_CATEGORIES_SUCCESS,
  GET_MOVIES_CATEGORIES_FAILURE, GET_RECOMMENDED_MOVIES,
  GET_RECOMMENDED_MOVIES_SUCCESS, GET_RECOMMENDED_MOVIES_FAILURE,
  GET_TOP_RATED_MOVIES, GET_TOP_RATED_MOVIES_SUCCESS,
  GET_TOP_RATED_MOVIES_FAILURE, SET_AVAILABLE_LANGS,
  CHANGE_SETTINGS, FETCH_SUBTITLES, FETCH_SUBTITLES_SUCCESS,
  FETCH_SUBTITLES_FAILURE, PAUSE_TORRENT, GET_CLIENT_STATS,
  SET_MOVIE_DATA } from '../../actions'

const state = {
  popularMovies: null,
  popularMoviesError: null,
  specificMovie: null,
  specificMovieError: null,
  availableLangs: null
}

const mutations = {
  [FETCH_POPULAR_MOVIES_SUCCESS] (state, { movies }) {
    Vue.set(state, 'popularMovies', movies)
  },
  [FETCH_POPULAR_MOVIES_FAILURE] (state, { error }) {
    Vue.set(state, 'popularMoviesError', error)
  },
  [FETCH_SPECIFIC_MOVIE_SUCCESS] (state, { movie }) {
    Vue.set(state, 'specificMovie', movie)
  },
  [FETCH_SPECIFIC_MOVIE_FAILURE] (state, { error }) {
    Vue.set(state, 'specificMovieError', error)
  },
  [RESET_SPECIFIC_MOVIE] (state) {
    Vue.set(state, 'specificMovie', null)
  },
  [SEARCH_TERM_SUCCESS] (state, { movies }) {
    Vue.set(state, 'searchMovies', movies)
  },
  [SEARCH_TERM_FAILURE] (state, { error }) {
    Vue.set(state, 'searchTermError', error)
  },
  [RESET_TORRENTS] (state) {
    Vue.set(state, 'torrents', null)
  },
  [SEARCH_TORRENTS_SUCCESS] (state, { torrents }) {
    Vue.set(state, 'torrents', torrents)
  },
  [SEARCH_TORRENTS_FAILURE] (state, { error }) {
    Vue.set(state, 'torrentsError', error)
  },
  [ADD_TORRENT_SUCCESS] (state, { magnet, fileName }) {
    Vue.set(state, 'selectedHash', magnet)
    Vue.set(state, 'selectedFileName', fileName)
  },
  [ADD_TORRENT_FAILURE] (state, { error }) {
    Vue.set(state, 'selectedHashError', error)
  },
  [GET_MOVIES_CATEGORIES_SUCCESS] (state, { categories }) {
    Vue.set(state, 'categories', categories)
  },
  [GET_MOVIES_CATEGORIES_FAILURE] (state, { error }) {
    Vue.set(state, 'categoriesError', error)
  },
  [GET_RECOMMENDED_MOVIES_SUCCESS] (state, { movies }) {
    Vue.set(state, 'recommendedMovies', movies)
  },
  [GET_RECOMMENDED_MOVIES_FAILURE] (state, { error }) {
    Vue.set(state, 'recommendedMoviesError', error)
  },
  [GET_TOP_RATED_MOVIES_SUCCESS] (state, { movies }) {
    Vue.set(state, 'topRatedMovies', movies)
  },
  [GET_TOP_RATED_MOVIES_FAILURE] (state, { error }) {
    Vue.set(state, 'topRatedMoviesError', error)
  },
  [SET_AVAILABLE_LANGS] (state, { langs }) {
    Vue.set(state, 'availableLangs', langs)
  },
  [CHANGE_SETTINGS] (state, { settings }) {
    Vue.set(state, 'movieSettings', settings)
  },
  [FETCH_SUBTITLES_SUCCESS] (state, { file }) {
    Vue.set(state, 'subtitlesFile', file)
  },
  [FETCH_SUBTITLES_FAILURE] (state, { error }) {
    Vue.set(state, 'subtitlesError', error)
  }
}

const actions = {
  [GET_MOVIES] (store, { payload }) {
    return new Promise((resolve, reject) => {
      movie.getMovies(
        payload.ids,
        (movies) => resolve(movies),
        (error) => reject(error)
      )
    })
  },
  [CHANGE_SETTINGS] ({ commit }, { payload }) {
    commit(CHANGE_SETTINGS, payload)
  },
  [PAUSE_TORRENT] (store, { payload }) {
    return new Promise((resolve, reject) => {
      movie.pauseTorrent(
        payload.magnet,
        () => resolve(),
        (err) => reject(err)
      )
    })
  },
  [GET_CLIENT_STATS] (store, { payload }) {
    return new Promise((resolve, reject) => {
      movie.getStats(
        (stats) => resolve(stats),
        (error) => reject(error)
      )
    })
  },
  [FETCH_SUBTITLES] ({ commit }, { payload }) {
    return new Promise((resolve, reject) => {
      movie.fetchSubtitles(
        payload.options,
        (file) => {
          commit(FETCH_SUBTITLES_SUCCESS, { file })
          reject(file)
        },
        (error) => {
          commit(FETCH_SUBTITLES_FAILURE, { error })
          reject(error)
        }
      )
    })
  },
  [ADD_TORRENT] ({ commit }, { payload }) {
    return new Promise((resolve, reject) => {
      movie.addTorrent(
        payload.hash,
        ({ magnet, fileName }) => {
          commit(ADD_TORRENT_SUCCESS, { magnet, fileName })
          resolve(magnet)
        },
        (error) => {
          commit(ADD_TORRENT_FAILURE, { error })
          reject(error)
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
        (error) => {
          commit(FETCH_POPULAR_MOVIES_FAILURE, { error })
          reject(error)
        }
      )
    })
  },
  [GET_RECOMMENDED_MOVIES] ({ commit }, { payload }) {
    return new Promise((resolve, reject) => {
      movie.getRecommended(
        payload.id,
        (movies) => {
          commit(GET_RECOMMENDED_MOVIES_SUCCESS, { movies })
          resolve(movies)
        },
        (error) => {
          commit(GET_RECOMMENDED_MOVIES_FAILURE, { error })
          reject(error)
        }
      )
    })
  },
  [GET_TOP_RATED_MOVIES] ({ commit }) {
    return new Promise((resolve, reject) => {
      movie.getTopRated(
        (movies) => {
          commit(GET_TOP_RATED_MOVIES_SUCCESS, { movies })
          resolve(movies)
        },
        (error) => {
          commit(GET_TOP_RATED_MOVIES_FAILURE, { error })
          reject(error)
        }
      )
    })
  },
  [GET_MOVIES_CATEGORIES] ({ commit }) {
    return new Promise((resolve, reject) => {
      movie.getMoviesGenres(
        (categories) => {
          commit(GET_MOVIES_CATEGORIES_SUCCESS, { categories })
          resolve(categories)
        },
        (error) => {
          commit(GET_MOVIES_CATEGORIES_FAILURE, { error })
          reject(error)
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
        (error) => {
          commit(FETCH_SPECIFIC_MOVIE_FAILURE, { error })
          reject(error)
        }
      )
    })
  },
  [SET_MOVIE_DATA] ({ commit }, { payload }) {
    return new Promise((resolve, reject) => {
      const { torrents, langs } = payload
      commit(SEARCH_TORRENTS_SUCCESS, { torrents })
      commit(SET_AVAILABLE_LANGS, { langs })
      resolve()
    })
  },
  [SEARCH_TORRENTS] ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      movie.getTorrents(
        payload.title,
        () => {
          // commit(SEARCH_TORRENTS_SUCCESS, { torrents })
          // commit(SET_AVAILABLE_LANGS, { langs })
          // resolve(torrents)
        },
        (error) => {
          commit(SEARCH_TORRENTS_FAILURE, { error })
          reject(error)
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
        (error) => {
          commit(SEARCH_TERM_FAILURE, { error })
          reject(error)
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
