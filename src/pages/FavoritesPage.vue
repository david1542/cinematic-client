<template>
  <div class="favorites-page">
    <Navbar />
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getMovies } from '../actions/creators'
import MovieListItem from '@/components/MovieListItem'
import Navbar from '@/components/Navbar'
export default {
  name: 'FavoritesPage',
  components: {
    MovieListItem,
    Navbar
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

<style>
.favorites-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100%;
  background-image: url("../assets/theater.jpg");
  background-size: 100vw 100vh;
  background-attachment: fixed;
}

.favorites-page > .header {
  padding: 12px 40px;
  display: flex;
  width: 100%;
}

.favorites-page > .header > h1 {
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
