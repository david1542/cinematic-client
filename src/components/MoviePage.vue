<template>
    <div class='movie-page'>
      <div v-if="movie" class='movie-container'>
        <img v-bind:src='movie.poster' alt=''>
        <div class='movie-overview'>
          <h1 class='title'>{{ movie.original_title }}</h1>
          <h2 class='description'>{{ movie.overview }}</h2>
        </div>
      </div>
      <div v-if="trailer" class='trailer'>
        <iframe frameborder='0' height='100%' width='100%' v-bind:src="trailer">
        </iframe>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import { specificMovieUrl, generateImageUrl, generateVideosUrl, generateYoutubeUrl } from '../queries'
export default {
  name: 'MoviePage',
  data: function () {
    return {
      movie: null,
      trailer: null,
      error: null
    }
  },
  mounted () {
    const { id } = this.$router.history.current.query
    axios.get(specificMovieUrl(id)).then((res) => {
      if (res.status === 200) {
        const movie = res.data
        movie.poster = generateImageUrl(300, movie.poster_path)

        this.movie = movie

        return axios.get(generateVideosUrl(movie.id))
      } else throw new Error(res.status)
    }).then((res) => {
      if (res.status === 200) {
        let video = res.data.results[0]
        res.data.results.forEach(function (item) {
          if (item.size >= video.size && item.type === 'Trailer') {
            video = item
          }
        })

        this.trailer = generateYoutubeUrl(video.key)
      } else throw new Error(res.status)
    })
  }
}
</script>

<style>
.movie-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-image: url('../assets/theater.jpg');
  z-index: -3;
  background-size: 100vw 100vh;
  background-attachment: fixed;
}

.movie-page > .trailer {
  position: fixed;
  z-index: 0;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: scale(1.2,1.4);
}

.movie-container {
  width: 100%;
  min-height: 470px;
  display: flex;
  justify-content: flex-start;
  padding: 60px 40px;
  flex-wrap: wrap;
  z-index: 1;
}

.movie-container > img {
  flex-basis: 20%;
}

.movie-container > .movie-overview {
  flex-basis: 70%;
  padding: 0 40px;
}

.movie-container > .movie-overview > .title {
  color: white;
  font-size: 30px;
  font-weight: bold;
  text-align: left;
}

.movie-container > .movie-overview > .description {
  color: white;
  font-size: 20px;
  font-weight: normal;
  text-align: left;
}
</style>
