<template>
  <AppPage>
    <div class="header">
      <h1 class="display-4">
        Favorites
      </h1>
    </div>
    <div class="movie-list">
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
import { getMovies } from '../actions/creators'
import MovieListItem from '@/components/MovieListItem'
export default {
  name: 'FavoritesPage',
  components: {
    MovieListItem
  },
  data () {
    return {
      movies: null,
      error: null
    }
  },
  computed: mapState('user', ['user']),
  mounted () {
    const ids = this.user.favorites
    this.$store.dispatch(getMovies(ids)).then(movies => {
      this.movies = movies
    }).catch(err => {
      this.error = err
    })
    // fetch favorites movies
  }
}
</script>

<style scoped>
.page-container {
  height: auto;
}
.header {
  padding: 12px 40px;
  display: flex;
  width: 100%;
}

.header > h1 {
  color: white;
  font-size: 29px;
}

.movie-list {
  display: flex;
  flex-direction: column;
  padding: 8px 40px;
  width: 100%;
}
</style>
