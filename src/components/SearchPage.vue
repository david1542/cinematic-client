<template>
  <div class="search-page">
    <div class="header">
      <h1 class="display-4">
        Hello from search page
      </h1>
    </div>
    <div class="movie-list">
      <div
        class="movie-item"
        v-for="movie in movies"
        v-bind:key="movie.id"
      >
        {{ movie.original_title }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { moviesQueryUrl } from '../queries'

export default {
  name: 'SearchPage',
  data: function () {
    return {
      movies: null,
      err: null
    }
  },
  methods: {
     generateImage: function (poster, size) {
      return MOVIE_IMG_ROOT + 'w' + size + '/' + poster
    }
  },
  mounted: function () {
    const { query } = this.$router.history.current.query
    axios.get(moviesQueryUrl(query)).then(res => {
      if (res.status === 200) {
        this.movies = res.data.results.map(movie => {
        movie.poster = this.generateImage(movie.poster_path, 300)
        return movie
      })
      } else throw new Error('Could not search')
    }).catch(err => console.log(err))
  }
}
</script>

<style>
.search-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  height: 100%;
  width: 100%;
  background-image: url('../assets/theater.jpg');
  background-size: cover;
}

.search-page > .header {
  padding: 12px 18px;
  display: flex;
  width: 100%;
}

.search-page > .header > h1 {
  color: white;
  font-size: 29px;
}
</style>
