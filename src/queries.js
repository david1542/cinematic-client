import {
  OMDB_ROOT,
  API_KEY,
  SERVER_URL
} from './config'

const language = localStorage.getItem('language') || 'en'

export const moviesQueryUrl = (query) => {
  return OMDB_ROOT + 'search/movie?api_key=' + API_KEY + '&query=' + query + '&language=' + language
}

export const popularMoviesUrl = () => {
  return OMDB_ROOT + 'movie/popular?api_key=' + API_KEY + '&language=' + language
}

export const topRatedMoviesUrl = () => {
  return 'https://api.themoviedb.org/3/movie/top_rated?api_key=01583083c32e46250aa6bd51fb1b79d6' + '&language=' + language
}

export const getRecommendedMovies = (id) => {
  return OMDB_ROOT + 'movie/' + id + '/recommendations?api_key=' + API_KEY + '&language=' + language
}

export const getGenres = () => {
  return OMDB_ROOT + 'genre/movie/list?api_key=' + API_KEY + '&language=' + language
}

export const getMoviesByGenre = (genreId) => {
  return OMDB_ROOT + 'discover/movie?with_genres=' + genreId + '&api_key=' + API_KEY + '&language=' + language
}

export const generateImageUrl = (size, name) => {
  return 'https://image.tmdb.org/t/p/w' + size + '/' + name
}

export const specificMovieUrl = (id) => {
  return OMDB_ROOT + 'movie/' + id + '?api_key=' + API_KEY + '&language=' + language
}

export const getMovieCast = (id) => {
  return OMDB_ROOT + 'movie/' + id + '/credits?api_key=' + API_KEY + '&language=' + language
}

export const generateVideosUrl = (id) => {
  return OMDB_ROOT + 'movie/' + id + '/videos?api_key=' + API_KEY
}

export const generateYoutubeUrl = (key) => {
  return 'https://www.youtube.com/embed/' + key + '?autoplay=1&controls=0&showinfo=0&loop=1&showinfo=0&autohide=1&iv_load_policy=3'
}

export const getTorrentsUrl = (title) => {
  return SERVER_URL + '/videos/torrents?term=' + title
}

export const addTorrentMagnet = (magnet) => {
  return SERVER_URL + '/videos/add/' + magnet
}

export const searchSubtitles = (options) => {
  const query = Object.keys(options).map(key => `${key}=${options[key]}`).join('&')
  return SERVER_URL + '/videos/subtitles?' + query
}

export const pauseTorrent = (magnet) => {
  return SERVER_URL + '/videos/stream/' + magnet + '/pause'
}

export const getStats = () => {
  return SERVER_URL + '/videos/stats'
}
