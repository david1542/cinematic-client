<template>
  <AppPage>
    <div class="wrapper">
      <div v-if="specificMovie" class='movie-container'>
        <img :src='specificMovie.poster' alt=''>
        <div class='movie-overview'>
          <h1 class='title'>{{ specificMovie.original_title }}</h1>
          <h2 class='description'>{{ specificMovie.overview }}</h2>
          <div class="details">
            <h2 class="detail"><strong>Year:</strong> {{ specificMovie.release_date }} </h2>
            <h2 class="detail"><strong>Length:</strong> {{ specificMovie.runtime }} minutes </h2>
            <h2 class="detail"><strong>Genres:</strong> {{ genres }} </h2>
            <h2 class="detail"><strong>Actors:</strong> {{ actors }} </h2>
            <h2 class="detail"><strong>Director:</strong> {{ specificMovie.director }} </h2>
          </div>
          <div class="rating">
            <div class="rating-wrapper">
              <i class="fas fa-star"></i>
              <a :href="'https://www.imdb.com/title/' + specificMovie.imdb_id" target="_blank">
                {{ specificMovie.vote_average }}
              </a>
            </div>
          </div>
          <MovieSettingsBar />
        </div>
        <LikeButton
          class="like-button"
          :isFavorite="isFavorite"
          @click="addToFavorites"
        >
          <BigHeartButton :isActive="isFavorite" />
        </LikeButton>
      </div>
      <div class="recommended">
        <h2><strong>You may also like...</strong></h2>
        <MovieGallery :movies="recommendedMovies" />
      </div>
      <div v-if="specificMovie" class='trailer'>
        <iframe frameborder='0' height='100%' width='100%' :src="specificMovie.trailer">
        </iframe>
      </div>
    </div>
  </AppPage>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import LikeButton from '@/components/LikeButton'
import BigHeartButton from '@/components/BigHeartButton'
import MovieGallery from '@/components/MovieGallery'
import MovieSettingsBar from '@/components/MovieSettingsBar'
import { getMovie, addToFavorites,
  removeFromFavorites, getRecommended } from '@/actions/creators'
export default {
  name: 'MoviePage',
  props: {
    id: {
      required: true
    }
  },
  components: {
    LikeButton,
    BigHeartButton,
    MovieGallery,
    MovieSettingsBar
  },
  data: function () {
    return {
      trailer: null,
      error: null
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$store.dispatch(getMovie(this.id))
      this.$store.dispatch(getRecommended(this.id))
    },
    addToFavorites () {
      const exists = this.isMovieInFavorites(this.id)
      if (exists) {
        this.$store.dispatch(removeFromFavorites(this.id))
      } else {
        this.$store.dispatch(addToFavorites(this.id))
      }
    }
  },
  watch: {
    '$route.params.id' () {
      this.getData()
    }
  },
  computed: {
    ...mapState('movie', [
      'specificMovie',
      'recommendedMovies'
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
    },
    actors () {
      return this.specificMovie.actors.slice(0, 5).join(', ')
    }
  }
}
</script>

<style scoped>
.wrapper {
  transition: 0.3s;
  margin-top: -64px;
  padding-top: 40px;
}

.wrapper::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: -1;
}
.wrapper:hover::after {
  background-color: rgba(0, 0, 0, 0);
}
.like-button {
  position: absolute;
  right: 65px;
  top: 100px;
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

.recommended {
  display: flex;
  width: 100%;
  margin: 80px 0 100px 0;
  flex-direction: column;
  /* opacity: 0.3; */
  transition: 0.3s;
}

.recommended > h2 {
  padding-left: 40px;
  margin-bottom: 30px;
  font-size: 25px;
  color: white;
  font-weight: normal;
  text-align: left;
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
  font-size: 30px !important;
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

.movie-container > .movie-overview > .rating {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 50px;
  height: 50px;
  z-index: 3;
}

.movie-container > .movie-overview > .rating > .rating-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;
}

.movie-container > .movie-overview > .rating > .rating-wrapper > i {
  position: absolute;
  color: #F9C504;
  font-size: 45px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  display: block;
}

.movie-container > .movie-overview > .rating > .rating-wrapper > a {
  text-decoration: none;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
}
</style>
