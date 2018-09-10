import movie from '@/api/movie'
import { FETCH_POPULAR_MOVIES, FETCH_POPULAR_MOVIES_SUCCESS,
  FETCH_POPULAR_MOVIES_FAILURE, FETCH_SPECIFIC_MOVIE,
  FETCH_SPECIFIC_MOVIE_SUCCESS, FETCH_SPECIFIC_MOVIE_FAILURE,
  RESET_SPECIFIC_MOVIE } from '../../actions'

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
  }
}

// const getters = {

// }

const actions = {
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
  [FETCH_SPECIFIC_MOVIE] ({ commit }, { payload }) {
    commit(RESET_SPECIFIC_MOVIE)
    return new Promise((resolve, reject) => {
      movie.getSpecificMovie(
        payload.id,
        (movie) => {
          commit(FETCH_SPECIFIC_MOVIE_SUCCESS, { movie })
          resolve(movie)
        },
        (err) => {
          commit(FETCH_SPECIFIC_MOVIE_FAILURE, { err })
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
