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
  GET_TOP_RATED_MOVIES_FAILURE } from '../../actions'

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
  [FETCH_POPULAR_MOVIES_FAILURE] (state, { error }) {
    state.popularMoviesError = error
  },
  [FETCH_SPECIFIC_MOVIE_SUCCESS] (state, { movie }) {
    state.specificMovie = movie
  },
  [FETCH_SPECIFIC_MOVIE_FAILURE] (state, { error }) {
    state.specificMovieError = error
  },
  [RESET_SPECIFIC_MOVIE] (state) {
    state.specificMovie = null
  },
  [SEARCH_TERM_SUCCESS] (state, { movies }) {
    state.searchMovies = movies
  },
  [SEARCH_TERM_FAILURE] (state, { error }) {
    state.searchTermError = error
  },
  [RESET_TORRENTS] (state) {
    state.torrents = null
  },
  [SEARCH_TORRENTS_SUCCESS] (state, { torrents }) {
    state.torrents = torrents
  },
  [SEARCH_TORRENTS_FAILURE] (state, { error }) {
    state.torrentsError = error
  },
  [ADD_TORRENT_SUCCESS] (state, { hash }) {
    state.selectedHash = hash
  },
  [ADD_TORRENT_FAILURE] (state, { error }) {
    state.selectedHashError = error
  },
  [GET_MOVIES_CATEGORIES_SUCCESS] (state, { categories }) {
    state.categories = categories
  },
  [GET_MOVIES_CATEGORIES_FAILURE] (state, { error }) {
    state.categoriesError = error
  },
  [GET_RECOMMENDED_MOVIES_SUCCESS] (state, { movies }) {
    state.recommendedMovies = movies
  },
  [GET_RECOMMENDED_MOVIES_FAILURE] (state, { error }) {
    state.recommendedMoviesError = error
  },
  [GET_TOP_RATED_MOVIES_SUCCESS] (state, { movies }) {
    state.topRatedMovies = movies
  },
  [GET_TOP_RATED_MOVIES_FAILURE] (state, { error }) {
    state.topRatedMoviesError = error
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
  [ADD_TORRENT] ({ commit }, { payload }) {
    return new Promise((resolve, reject) => {
      movie.addTorrent(
        payload.hash,
        (hash) => {
          commit(ADD_TORRENT_SUCCESS, { hash })
          resolve(hash)
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
  [SEARCH_TORRENTS] ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      movie.getTorrents(
        payload.title,
        (torrents) => {
          commit(SEARCH_TORRENTS_SUCCESS, { torrents })
          resolve(torrents)
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
//   getters
}
