<template>
  <div class="list-container">
    <div class="movie-list" :style="{transform: 'translateX(' + getLeft + 'px)'}">
      <MovieGalleryItem
        v-for="(movie, index) in movies"
        :key="movie.id"
        :movie="movie"
        :centered="middleItem === index"
        :isFavorite="isMovieInFavorites(movie.id)"
        :isAuthenticated="isAuthenticated"
        :actionMessage="actionMessage"
        :addedMovieId="addedMovieId"
        @favorite="addToFavorites"
        @click="showMovie"
      />
    </div>
    <div class="slide-buttons">
      <div class="next button" :class="{ hidden: middleItem === movies.length - 1 }">
        <i class="fas fa-arrow-right fa-3x" v-on:click="increase"></i>
      </div>
      <div class="prev button" :class="{ hidden: middleItem === 0 }">
        <i class="fas fa-arrow-left fa-3x" v-on:click="decrease"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { addToFavorites, removeFromFavorites } from '../actions/creators'
import MovieGalleryItem from './MovieGalleryItem'
export default {
  name: 'movie-gallery',
  props: {
    movies: {
      required: true,
      type: Array
    }
  },
  components: {
    MovieGalleryItem
  },
  data: function () {
    return {
      middleItem: this.movies.length / 2,
      hoveredItem: null,
      actionMessage: '',
      addedMovieId: null
    }
  },
  methods: {
    increase: function () {
      this.middleItem += 1
    },
    decrease: function () {
      this.middleItem -= 1
    },
    showMovie: function (eventData) {
      const { id } = eventData
      this.$router.push({name: 'MoviePage', params: { id }})
    },
    addToFavorites: function (eventData) {
      const { id } = eventData
      const exists = this.isMovieInFavorites(id)
      if (exists) {
        this.$store.dispatch(removeFromFavorites(id)).then(id => {
          this.actionMessage = 'Removed from favorites!'
          this.addedMovieId = id

          setTimeout(() => {
            this.addedMovieId = null
          }, 2000)
        }).catch(err => {
          this.actionMessage = err.message
        })
      } else {
        this.$store.dispatch(addToFavorites(id)).then(id => {
          this.actionMessage = 'Added to favorites!'
          this.addedMovieId = id

          setTimeout(() => {
            this.addedMovieId = null
          }, 2000)
        }).catch(err => {
          this.actionMessage = err.message
        })
      }
    }
  },
  computed: {
    getLeft: function () {
      return this.middleItem * -144
    },
    ...mapGetters('user', [
      'isAuthenticated',
      'isMovieInFavorites'
    ])
  }
}
</script>

<style scoped>
@import url("hover.css/css/hover-min.css");

.hvr-outline-in:before {
  border: white solid 2px;
  border-radius: 5px;
  transition-duration: 0.3s;
}
.list-container {
  position: relative;
  width: 100vw;
}

.movie-list {
  display: flex;
  position: absolute;
  transition: 0.3s;
  margin-left: 41.5%;
  transform-origin: center;
  z-index: 2;
}

.slide-buttons {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 200px;
}

.slide-buttons > .button {
  position: absolute;
  display: inline-block;
  cursor: pointer;
  z-index: 3;
}

.slide-buttons > .button.hidden {
  display: none;
}

.slide-buttons > .next {
  right: 40px;
}

.slide-buttons > .prev {
  left: 40px;
}

.slide-buttons > .button > i.fas {
  color: white;
  transition: 0.3s;
}

.slide-buttons > .button > i.fas:hover {
  opacity: 0.8;
}
</style>
