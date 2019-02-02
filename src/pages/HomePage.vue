<template>
  <AppPage waitForUser>
    <template v-if="asyncDataStatus_ready">
      <h2 class="popular-movies">Popular</h2>
      <MovieGallery :movies="popularMovies" class="margin-bottom-200" />
      <h2 class="popular-movies">Must See Movies</h2>
      <MovieGallery :movies="topRatedMovies" class="margin-bottom-200" />
      <CategoryList :categories="categories" />
    </template>
    <!-- <h2 class="page-title">Movie Search Engine</h2> -->
    <!-- <SearchBar :search-movie="sendQuery" /> -->
  </AppPage>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import SearchBar from '@/components/SearchBar'
import MovieGallery from '@/components/MovieGallery'
import CategoryList from '@/components/CategoryList'
import { getPopularMovies, getMoviesCategories,
  getTopRated } from '../actions/creators'

export default {
  name: 'HomePage',
  components: {
    SearchBar,
    MovieGallery,
    CategoryList
  },
  mixins: [
    asyncDataStatus
  ],
  mounted () {
    Promise.all([
      this.$store.dispatch(getPopularMovies()),
      this.$store.dispatch(getTopRated()),
      this.$store.dispatch(getMoviesCategories())
    ]).then(() => {
      this.asyncDataStatus_fetched()
    })
  },
  methods: {
    sendQuery: function (query) {
      this.$router.push({path: 'search', query: { query }})
    },
    moveToRegister: function () {
      this.$router.push('register')
    }
  },
  computed: {
    ...mapState('movie', [
      'popularMovies',
      'topRatedMovies',
      'categories'
    ]),
    ...mapGetters('user', [
      'isAuthenticated'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-container {
  height: auto;
}
.popular-movies {
  font-size: 43px;
  text-align: center;
  color: white;
  margin-top: 200px;
  font-weight: bold;
}

.popular-movies {
  margin-top: 0;
  margin: 40px 0 100px 0;
}

.margin-bottom-200 {
  margin-bottom: 200px;
}
</style>
