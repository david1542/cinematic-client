<template>
  <AppPage>
    <h2 class="popular-movies">Popular Movies</h2>
    <MovieGallery v-if="popularMovies" :movies="popularMovies" />
    <h2 class="page-title">Movie Search Engine</h2>
    <SearchBar :search-movie="sendQuery" />
  </AppPage>
</template>

<script>
import { mapState } from 'vuex'
import MovieGallery from '@/components/MovieGallery'
import SearchBar from '@/components/SearchBar'
import { getPopularMovies } from '../actions/creators'

export default {
  name: 'HomePage',
  components: {
    MovieGallery,
    SearchBar
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
.page-container {
  height: auto;
}
.page-title,
.popular-movies {
  font-size: 20px;
  text-align: center;
  color: white;
  margin-top: 200px;
}

.popular-movies {
  margin-top: 0;
  margin: 40px 0 100px 0;
}
</style>
