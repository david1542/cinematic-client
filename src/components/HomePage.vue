<template>
  <div class="home-page">
    <nav-bar />
    <h2 class="popular-movies">Popular Movies</h2>
    <movie-gallery v-if="popularMovies" v-bind:movies="popularMovies" />
    <h2 class="page-title">Search movies now for free!</h2>
    <search-bar v-on:search-movie="sendQuery" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MovieGallery from './MovieGallery'
import SearchBar from './SearchBar'
import Navbar from './Navbar'
import { getPopularMovies } from '../actions/creators'

export default {
  name: 'HomePage',
  components: {
    'movie-gallery': MovieGallery,
    'search-bar': SearchBar,
    'nav-bar': Navbar
  },
  mounted () {
    this.$store.dispatch(getPopularMovies())
  },
  methods: {
    sendQuery: function (query) {
      this.$router.push({path: 'search', query: { query }})
    },
    moveToRegister: function () {
      this.$router.push('register')
    }
  },
  computed: mapState('movie', [
    'popularMovies'
  ])
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  width: 100%;
  background-image: url('../assets/theater.jpg');
  background-size: cover;
  padding-top: 70px;
  padding-bottom: 150px;
}
.home-page > .page-title,
.home-page > .popular-movies {
  font-size: 20px;
  text-align: center;
  color: white;
  margin-top: 200px;
}

.home-page > .popular-movies {
  margin-top: 0;
  margin: 40px 0 100px 0;
}
</style>
