<template>
  <div class="home-page">
    <h2 class="page-title">Movie App - Vue.js</h2>
    <search-bar v-on:search-movie="sendQuery" />
    <h2 class="popular-movies">Popular Movies</h2>
    <movie-gallery v-if="movies" v-bind:movies="movies" />
  </div>
</template>

<script>
import axios from 'axios'
import MovieGallery from './MovieGallery'
import SearchBar from './SearchBar'
import { popularMoviesUrl } from '../queries'
import { MOVIE_IMG_ROOT } from '../config'

export default {
  name: 'HomePage',
  components: {
    'movie-gallery': MovieGallery,
    'search-bar': SearchBar
  },
  data () {
    return {
      movies: null,
      error: null
    }
  },
  mounted () {
    axios.get(popularMoviesUrl()).then(res => {
      if (res.status !== 200) throw new Error('Failed to fetch')

      this.movies = res.data.results.map(movie => {
        movie.poster = this.generateImage(movie.poster_path, 300)
        return movie
      })
    })
  },
  methods: {
    generateImage: function (poster, size) {
      return MOVIE_IMG_ROOT + 'w' + size + '/' + poster
    },
    sendQuery: function (query) {
      this.$router.push({path: 'search', query: { query }})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  height: 100%;
  width: 100%;
  background-image: url('../assets/theater.jpg');
  background-size: cover;
}
.home-page > .page-title,
.home-page > .popular-movies {
  font-size: 20px;
  text-align: center;
  color: white;
  margin-top: 30px;
}

.home-page > .popular-movies {
  margin-top: 0;
  margin-bottom: 100px;
}
</style>
