import ACTIONS from './index'

// Action Creators
export const registerUser = userDetails => ({
  type: 'user/' + ACTIONS.REGISTER_REQUEST,
  payload: { userDetails }
})

export const loginUser = userDetails => ({
  type: 'user/' + ACTIONS.LOGIN_REQUEST,
  payload: { userDetails }
})

export const logoutUser = () => ({
  type: 'user/' + ACTIONS.LOGOUT_REQUEST
})

export const addToFavorites = (id) => ({
  type: 'user/' + ACTIONS.ADD_TO_FAVORITES,
  payload: { id }
})

export const removeFromFavorites = (id) => ({
  type: 'user/' + ACTIONS.REMOVE_FROM_FAVORITES,
  payload: { id }
})

export const getPopularMovies = () => ({
  type: 'movie/' + ACTIONS.FETCH_POPULAR_MOVIES
})

export const getMoviesCategories = () => ({
  type: 'movie/' + ACTIONS.GET_MOVIES_CATEGORIES
})

export const getMovie = (id) => ({
  type: 'movie/' + ACTIONS.FETCH_SPECIFIC_MOVIE,
  payload: { id }
})

export const getMovies = (ids) => ({
  type: 'movie/' + ACTIONS.GET_MOVIES,
  payload: { ids }
})

export const searchMovies = (term) => ({
  type: 'movie/' + ACTIONS.SEARCH_TERM,
  payload: { term }
})

export const addTorrent = (hash) => ({
  type: 'movie/' + ACTIONS.ADD_TORRENT,
  payload: { hash }
})

export const getRecommended = (id) => ({
  type: 'movie/' + ACTIONS.GET_RECOMMENDED_MOVIES,
  payload: { id }
})
