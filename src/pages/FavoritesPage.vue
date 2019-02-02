<template>
  <AppPage waitForUser>
    <div
      v-if="asyncDataStatus_ready"
      class="movie-list"
    >
      <MovieListItem
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
      />
    </div>
  </AppPage>
</template>

<script>
import { mapState } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import { getMovies } from '../actions/creators'
import MovieListItem from '@/components/MovieListItem'

export default {
  name: 'FavoritesPage',
  components: {
    MovieListItem
  },
  mixins: [
    asyncDataStatus
  ],
  data () {
    return {
      movies: null,
      error: null
    }
  },
  computed: mapState('user', ['user']),
  methods: {
    fetchData () {
      const ids = this.user.favorites
      this.$store.dispatch(getMovies(ids)).then(movies => {
        this.asyncDataStatus_fetched()
        this.movies = movies
      }).catch(err => {
        this.error = err
      })
    }
  },
  mounted () {
    if (this.user) {
      this.fetchData()
    }
  },
  watch: {
    user () {
      if (this.user) {
        this.fetchData()
      }
    }
  }
}
</script>

<style scoped>
.page-container {
  height: auto;
}

.header > h1 {
  color: white;
  font-size: 29px;
}

.movie-list {
  display: flex;
  flex-direction: column;
  padding: 29px 40px;
  width: 100%;
}
</style>
