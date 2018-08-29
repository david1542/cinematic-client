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
      movies: null
    }
  },
  mounted: function () {
    const { query } = this.$router.history.current.query
    axios.get(moviesQueryUrl(query)).then(res => {
      console.log(res.data)
      this.movies = res.data.results
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
