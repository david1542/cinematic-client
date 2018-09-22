<template>
  <AppPage>
    <div v-if="specificMovie" class='movie-container'>
      <img :src='specificMovie.poster' alt=''>
      <div class='movie-overview'>
        <h1 class='title'>{{ specificMovie.original_title }}</h1>
        <h2 class='description'>{{ specificMovie.overview }}</h2>
        <MovieTorrents v-if="torrents && torrents.length > 0" :torrents="torrents" />
        <div v-else-if="torrents && torrents.length === 0" class="message">
          <i class="fas fa-exclamation-circle"></i>
          No Available Torrents
        </div>
        <div v-else class="message">
          <i class="fas fa-spinner fa-spin"></i>
          Loading Torrents...
        </div>
      </div>
    </div>
    <div v-if="specificMovie" class='trailer'>
      <iframe frameborder='0' height='100%' width='100%' :src="specificMovie.trailer">
      </iframe>
    </div>
  </AppPage>
</template>

<script>
import MovieTorrents from '@/components/MovieTorrents'
import { getMovie } from '../actions/creators'
import { mapState } from 'vuex'
export default {
  name: 'MoviePage',
  components: {
    MovieTorrents
  },
  data: function () {
    return {
      trailer: null,
      error: null
    }
  },
  mounted () {
    const { id } = this.$router.history.current.query
    this.$store.dispatch(getMovie(id))
  },
  computed: mapState('movie', [
    'specificMovie',
    'torrents'
  ])
}
</script>

<style>
.trailer {
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: scale(1.2,1.4);
  user-select: none;
  pointer-events: none;
}

.movie-container {
  width: 100%;
  min-height: 470px;
  display: flex;
  justify-content: flex-start;
  padding: 60px 40px;
  flex-wrap: wrap;
  z-index: 2;
  opacity: 0.1;
  transition: 0.3s;
  animation: fadeOutAnimation 1s ease-out 1s forwards;
}

.movie-container:hover {
  opacity: 1;
}
.movie-container > img {
  flex-basis: 20%;
}

.movie-container > .movie-overview {
  position: relative;
  flex-basis: 70%;
  padding: 0 40px;
}

.movie-container > .movie-overview > .title {
  color: white;
  font-size: 30px;
  font-weight: bold;
  text-align: left;
}

.movie-container > .movie-overview > .description {
  color: white;
  font-size: 20px;
  font-weight: normal;
  text-align: left;
}

.movie-container > .movie-overview > .message {
  position: absolute;
  color: white;
  font-weight: bold;
  bottom: 0;
  left: 0;
  padding-left: 40px;
}

.movie-container > .movie-overview > .message > .fas {
  font-size: 20px;
  margin-right: 4px;
}
</style>
