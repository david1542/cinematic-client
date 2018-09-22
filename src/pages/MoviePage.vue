<template>
  <AppPage>
    <div v-if="specificMovie" class='movie-container'>
      <img :src='specificMovie.poster' alt=''>
      <div class='movie-overview'>
        <h1 class='title'>{{ specificMovie.original_title }}</h1>
        <h2 class='description'>{{ specificMovie.overview }}</h2>
        <div class="details">
          <h2 class="detail"><strong>Year:</strong> {{ specificMovie.release_date }} </h2>
          <h2 class="detail"><strong>Length:</strong> {{ specificMovie.runtime }} minutes </h2>
          <h2 class="detail"><strong>Genres:</strong> {{ genres }} </h2>
        </div>
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
      <LikeButton
        class="like-button"
        :isFavorite="isFavorite"
        @click="addToFavorites"
      >
        <BigHeartButton :isActive="isFavorite" />
      </LikeButton>
    </div>
    <div v-if="specificMovie" class='trailer'>
      <iframe frameborder='0' height='100%' width='100%' :src="specificMovie.trailer">
      </iframe>
    </div>
  </AppPage>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import MovieTorrents from '@/components/MovieTorrents'
import LikeButton from '@/components/LikeButton'
import BigHeartButton from '@/components/BigHeartButton'
import { getMovie, addToFavorites, removeFromFavorites } from '@/actions/creators'
export default {
  name: 'MoviePage',
  props: {
    id: {
      required: true
    }
  },
  components: {
    MovieTorrents,
    LikeButton,
    BigHeartButton
  },
  data: function () {
    return {
      trailer: null,
      error: null
    }
  },
  mounted () {
    this.$store.dispatch(getMovie(this.id))
  },
  methods: {
    addToFavorites () {
      const exists = this.isMovieInFavorites(this.id)
      if (exists) {
        this.$store.dispatch(removeFromFavorites(this.id))
      } else {
        this.$store.dispatch(addToFavorites(this.id))
      }
    }
  },
  computed: {
    ...mapState('movie', [
      'specificMovie',
      'torrents'
    ]),
    ...mapGetters('user', [
      'isMovieInFavorites'
    ]),
    isFavorite () {
      return this.isMovieInFavorites(this.specificMovie.id)
    },
    genres () {
      const output = this.specificMovie.genres.map(genre => {
        return genre.name
      }).join(', ')

      return output
    }
  }
}
</script>

<style scoped>
.like-button {
  position: absolute;
  right: 65px;
  top: 40px;
  cursor: pointer;
}
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
  position: relative;
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

.movie-container > .movie-overview > .description,
.movie-container > .movie-overview > .details > .detail {
  color: white;
  font-size: 20px;
  font-weight: normal;
  text-align: left;
}
.movie-container > .movie-overview > .details {
  margin-top: 20px;
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
