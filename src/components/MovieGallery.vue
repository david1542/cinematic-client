<template>
  <div class="list-container">
    <div
      class="movie-list"
      :style="{
        transform: 'translateX(' + getLeft + 'px)',
        marginLeft
      }"
      ref="movieList"
    >
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
        <i class="fas fa-arrow-right fa-2x" v-on:click="increase"></i>
      </div>
      <div class="prev button" :class="{ hidden: middleItem === 0 }">
        <i class="fas fa-arrow-left fa-2x" v-on:click="decrease"></i>
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
  data () {
    return {
      middleItem: this.movies.length / 2,
      hoveredItem: null,
      actionMessage: '',
      addedMovieId: null,
      marginLeft: ''
    }
  },
  methods: {
    evaluateArray () {
      console.log(this.$refs.movieList)
    },
    increase: function () {
      this.middleItem += 1
      this.evaluateArray('right')
    },
    decrease: function () {
      this.middleItem -= 1
      this.evaluateArray('left')
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
    },
    handleResize () {
      this.evaluateMargin()
    },
    evaluateMargin () {
      const screenWidth = window.innerWidth
      this.marginLeft = (screenWidth / 2 - 120) + 'px'
    }
    // evaluateArray (direction) {
    //   const children = this.$refs.movieList.childNodes
    //   let reachedVisible = false
    //   let counter = 0
    //   let startIndex = direction === 'left' ? this.movies.length : 0

    //   while (!reachedVisible) {
    //     const child = direction === 'left' ? children[childre.length - 1] : children[0]
    //     const xPosition = child.offsetLeft
    //     const width = child.offsetWidth

    //     if (direction === 'left') {
    //       if (xPosition + width <= 0) {
    //         const lastItem = children.pop()
    //         children
    //       } else {
    //         reachedVisible = true
    //       }
    //     } else {
    //       if (xPosition >= window.innerWidth) {
    //         const [first, ...rest] = children
    //         children = [...rest, first]
    //       } else {
    //         reachedVisible = true
    //       }
    //     }
    //   }
    // }
  },
  mounted () {
    this.evaluateMargin()
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
  },
  computed: {
    getLeft () {
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
  /* margin-left: 41.5%; */
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
  z-index: 2;
  padding: 7px 12px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.9);
  transition: 0.3s;
  box-shadow: 0px 2px 3px 3px rgba(0, 0, 0, 0.2);
}

.slide-buttons > .button:hover {
  transform: translateY(-7px);
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
