import {
  OMDB_ROOT,
  API_KEY
} from './config'

export const moviesQueryUrl = (query) => {
  return OMDB_ROOT + 'search/movie?api_key=' + API_KEY + '&query=' + query
}

export const popularMoviesUrl = () => {
  return 'https://api.themoviedb.org/3/movie/popular?api_key=' + API_KEY
}

export const generateImageUrl = (size, name) => {
  return 'https://image.tmdb.org/t/p/w' + size + '/' + name
}
