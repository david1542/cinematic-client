<template>
  <div class="home-page">
    <Navbar />
    <h2 class="popular-movies">Popular Movies</h2>
    <MovieGallery v-if="popularMovies" :movies="popularMovies" />
    <h2 class="page-title">Search movies now for free!</h2>
    <SearchBar :search-movie="sendQuery" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MovieGallery from '@/components/MovieGallery'
import SearchBar from '@/components/SearchBar'
import Navbar from '@/components/Navbar'
import { getPopularMovies } from '../actions/creators'

export default {
  name: 'HomePage',
  components: {
    MovieGallery,
    SearchBar,
    Navbar
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
