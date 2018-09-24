import axios from 'axios'
import async from 'async'
import { popularMoviesUrl, specificMovieUrl,
  generateImageUrl, generateVideosUrl,
  generateYoutubeUrl, moviesQueryUrl,
  addTorrentMagnet, getGenres, getMoviesByGenre,
  getRecommendedMovies, topRatedMoviesUrl,
  getMovieCast } from '../queries'
import {
  SERVER_URL
} from '../config'

export default {
  addTorrent (hash, success, failure) {
    const token = localStorage.getItem('user-token')
    axios({
      method: 'POST',
      url: addTorrentMagnet(hash),
      headers: { token }
    }).then(res => {
      success(res.data)
    }).catch(err => {
      failure(err)
    })
  },
  getTorrents (term, success, failure) {
    const token = localStorage.getItem('user-token')
    axios({
      method: 'GET',
      url: SERVER_URL + '/videos/torrents?term=' + term,
      headers: { token }
    }).then(res => {
      success(res.data)
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
  getMoviesGenres (success, failure) {
    axios.get(getGenres()).then(res => {
      const moviePromises = []
      res.data.genres.forEach(genre => {
        const fetch = new Promise((resolve, reject) => {
          axios.get(getMoviesByGenre(genre.id)).then(res => {
            const movies = res.data.results.map(movie => {
              movie.poster = generateImageUrl(300, movie.poster_path)
              return movie
            })
            resolve({
              name: genre.name,
              movies
            })
          }).catch(err => reject(err))
        })

        moviePromises.push(fetch)
      })

      return Promise.all(moviePromises)
    }).then(categories => {
      success(categories)
    }).catch(err => failure(err))
  },
  getRecommended (id, success, failure) {
    axios.get(getRecommendedMovies(id)).then(res => {
      const movies = res.data.results.map(movie => {
        movie.poster = generateImageUrl(300, movie.poster_path)
        return movie
      })

      success(movies)
    }).catch(err => {
      failure(err)
    })
  },
  getTopRated (success, failure) {
    axios.get(topRatedMoviesUrl()).then(res => {
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
    const movieSearch = axios.get(specificMovieUrl(id)).then(res => {
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

      return foundMovie
    }).catch(err => {
      throw err
    })

    const castSearch = axios.get(getMovieCast(id)).then(res => {
      const actors = res.data.cast.map(actor => actor.name)
      const director = res.data.crew.find(member => member.job === 'Director')
      return {
        actors,
        director
      }
    }).catch(err => {
      throw err
    })

    Promise.all([movieSearch, castSearch]).then(res => {
      const movie = res[0]
      const crew = res[1]

      movie.actors = crew.actors
      movie.director = crew.director.name

      success(movie)
    }).catch(err => {
      failure(err)
    })
  },
  getMovies (ids, success, failure) {
    async.map(ids, (id, callback) => {
      axios.get(specificMovieUrl(id)).then(res => {
        const movie = res.data
        movie.poster = generateImageUrl(200, movie.poster_path)

        callback(null, movie)
      }).catch(err => {
        callback(err)
      })
    }, (err, result) => {
      if (err) return failure(err)

      success(result)
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
