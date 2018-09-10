import axios from 'axios'
import { popularMoviesUrl, specificMovieUrl,
  generateImageUrl, generateVideosUrl,
  generateYoutubeUrl, moviesQueryUrl } from '../queries'
import {
  SERVER_URL
} from '../config'

export default {
  getTorrents (term, success, failure) {
    const token = localStorage.getItem('user-token')
    axios({
      method: 'GET',
      url: SERVER_URL + '/videos/torrents?term=' + term,
      headers: {
        token
      }
    }).then(res => {
      if (res.status === 200) {
        success(res.data)
      }
    }).catch(err => {
      failure(err)
    })
  },
  getPopularMovies (success, failure) {
    axios.get(popularMoviesUrl()).then(res => {
      const movies = res.data.results.map(movie => {
        movie.poster = generateImageUrl(300, movie.poster_path)
        return movie
      })

      success(movies)
    }).catch(err => {
      failure(err)
    })
  },
  getSpecificMovie (id, success, failure) {
    let foundMovie
    axios.get(specificMovieUrl(id)).then(res => {
      const movie = res.data
      movie.poster = generateImageUrl(300, movie.poster_path)

      foundMovie = movie

      return axios.get(generateVideosUrl(foundMovie.id))
    }).then(res => {
      let video = res.data.results[0]
      res.data.results.forEach(function (item) {
        if (item.size >= video.size && item.type === 'Trailer') {
          video = item
        }
      })

      foundMovie.trailer = generateYoutubeUrl(video.key)
      success(foundMovie)
    }).catch(err => {
      failure(err)
    })
  },
  search (term, success, failure) {
    axios.get(moviesQueryUrl(term)).then(res => {
      const movies = res.data.results.map(movie => {
        movie.poster = generateImageUrl(300, movie.poster_path)
        return movie
      })

      success(movies)
    }).catch(err => {
      failure(err)
    })
  }
}
