<template>
  <AppPage waitForUser>
    <MovieLoader
      :loading="loading"
      :progress="progress"
    />
    <MoviePlayer
      v-show="readyToWatch"
      :startPlay="readyToWatch"
      :startStream.sync="startStream"
    />
    <div v-if="!readyToWatch" class="wrapper">
      <div v-if="specificMovie" class='movie-container'>
        <img :src='specificMovie.poster' alt=''>
        <div class='movie-overview'>
          <h1 class='title'>{{ specificMovie.title }}</h1>
          <h2 class='description'>{{ specificMovie.overview }}</h2>
          <div class="details">
            <h2 class="detail"><strong>{{ $t('year') }}:</strong> {{ specificMovie.release_date }} </h2>
            <h2 class="detail"><strong>{{ $t('length') }}:</strong> {{ specificMovie.runtime }} {{ $t('minutes') }} </h2>
            <h2 class="detail"><strong>{{ $t('genres') }}:</strong> {{ genres }} </h2>
            <h2 class="detail"><strong>{{ $t('actors') }}:</strong> {{ actors }} </h2>
            <h2 class="detail"><strong>{{ $t('director') }}:</strong> {{ specificMovie.director }} </h2>
          </div>
          <div class="rating">
            <div class="rating-wrapper">
              <i class="fas fa-star"></i>
              <a :href="'https://www.imdb.com/title/' + specificMovie.imdb_id" target="_blank">
                {{ specificMovie.vote_average }}
              </a>
            </div>
          </div>
          <MovieSettingsBar
            @add-torrent="addTorrent"
            :torrents="torrents"
            :langs="availableLangs"
          />
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
        <h2><strong>{{ $t('youMayAlsoLike') }}</strong></h2>
        <MovieGallery
          v-if="recommendedMovies"
          :movies="recommendedMovies"
        />
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
import asyncDataStatus from '@/mixins/asyncDataStatus'
import MoviePlayer from '@/components/MoviePlayer'
import MovieLoader from '@/components/MovieLoader'
import LikeButton from '@/components/LikeButton'
import BigHeartButton from '@/components/BigHeartButton'
import MovieGallery from '@/components/MovieGallery'
import MovieSettingsBar from '@/components/MovieSettingsBar'
import EventBus from '@/eventBus'
import {
  getMovie,
  addToFavorites,
  removeFromFavorites,
  getRecommended,
  getClientStats,
  addTorrent
} from '@/actions/creators'

export default {
  name: 'MoviePage',
  props: {
    id: {
      required: true
    }
  },
  components: {
    MoviePlayer,
    MovieLoader,
    LikeButton,
    BigHeartButton,
    MovieGallery,
    MovieSettingsBar
  },
  mixins: [
    asyncDataStatus
  ],
  data () {
    return {
      trailer: null,
      error: null,
      loading: false,
      readyToWatch: false,
      startStream: false,
      percentThreshold: 3,
      progress: 0
    }
  },
  mounted () {
    if (this.user) {
      this.getData()
    } else {
      EventBus.$on('authenticated', this.getData)
    }
  },
  beforeDestroy () {
    EventBus.$off('authenticated', this.getData)
  },
  methods: {
    getData () {
      Promise.all([
        this.$store.dispatch(getMovie(this.id)),
        this.$store.dispatch(getRecommended(this.id))
      ]).then(() => {
        this.asyncDataStatus_fetched()
      })
    },
    checkProgress () {
      this.loading = true
      setTimeout(() => {
        console.log('Dispatching stats actions to see what\'s going on')
        this.$store.dispatch(getClientStats()).then(({ stats, status }) => {
          this.progress = stats.progress * 100 / this.percentThreshold
          if (this.progress >= 100 || status === 'completed') {
            this.loading = false
            this.readyToWatch = true
          } else {
            this.stats = stats
            this.checkProgress()
          }
        })
      }, 1000)
    },
    addTorrent (torrentIndex) {
      const selectedTorrent = this.torrents[torrentIndex]
      this.loading = true
      this.$store.dispatch(addTorrent(selectedTorrent.infoHash)).then(() => {
        this.startStream = true
        this.checkProgress()
      })
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
      'recommendedMovies',
      'torrents',
      'availableLangs'
    ]),
    ...mapState('user', ['user']),
    ...mapGetters('user', ['isMovieInFavorites']),
    isFavorite () {
      return this.isMovieInFavorites(this.specificMovie.id)
    },
    genres () {
      const output = this.specificMovie.genres
        .map(genre => {
          return genre.name
        })
        .join(', ')

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

.rtl .like-button {
  right: initial;
  left: 65px;
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
  transform: scale(1.2, 1.4);
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
  /* opacity: 0.1; */
  opacity: 1;
  transition: 0.3s;
  animation: fadeOutAnimation 1s ease-out 1s forwards;
}

.rtl .movie-container {
  flex-direction: row-reverse;
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

.rtl .recommended > h2 {
  text-align: right;
  padding-left: 0;
  padding-right: 40px;
  direction: rtl;
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

.rtl .movie-container > .movie-overview > .title {
  text-align: right;
}

.movie-container > .movie-overview > .description,
.movie-container > .movie-overview > .details > .detail {
  color: white;
  font-size: 20px;
  font-weight: normal;
  text-align: left;
}

.rtl .movie-container > .movie-overview > .description,
.rtl .movie-container > .movie-overview > .details > .detail {
  text-align: right;
  direction: rtl;
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

.rtl .movie-container > .movie-overview > .rating {
  right: initial;
  left: 0;
}

.movie-container > .movie-overview > .rating > .rating-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;
}

.movie-container > .movie-overview > .rating > .rating-wrapper > i {
  position: absolute;
  color: #f9c504;
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
