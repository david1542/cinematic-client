<template>
  <div class="list-container">
    <div class="movie-list" v-bind:style="{transform: 'translateX(' + getLeft + 'px)'}">
      <div
        class="movie-item hvr-outline-in"
        v-for="(movie, index) in movies"
        v-bind:key="movie.id"
        v-bind:class="{ centered: middleItem === index }"
        v-on:click="showMovie(movie.id)"
        v-on:mouseleave="hideActions"
        v-on:mouseenter="showActions(index)"
      >
        <img v-bind:src="movie.poster" />
        <h4 class="movie-title">{{movie.original_title}}</h4>
        <div class="actions" v-bind:class="{visible: isActionsVisible(index)}">
          <div class="actions-wrapper" v-if="isAuthenticated">
            <div
              class="favorites-button"
              v-on:mouseenter="fillFavoriteButton"
              v-on:mouseleave="unfillFavoriteButton"
              v-on:click.stop="addToFavorites(movie.id)"
            >
              <i v-bind:class="{hidden: !favoriteHovered && !isMovieInFavorites(movie.id)}" class="fas fa-heart"></i>
              <i v-bind:class="{hidden: favoriteHovered || isMovieInFavorites(movie.id)}" class="far fa-heart"></i>
            </div>
          </div>
        </div>
        <div v-if="movieMessage && addedMovieId === movie.id" class="alert-message animated">
          <h4 class="alert">{{ movieMessage }}</h4>
        </div>
      </div>
    </div>
    <div class="slide-buttons">
      <div class="next button" v-bind:class="{ hidden: middleItem === movies.length - 1 }">
        <i class="fas fa-arrow-right fa-3x" v-on:click="increase"></i>
      </div>
      <div class="prev button" v-bind:class="{ hidden: middleItem === 0 }">
        <i class="fas fa-arrow-left fa-3x" v-on:click="decrease"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { addToFavorites, removeFromFavorites } from '../actions/creators'
export default {
  name: 'movie-gallery',
  props: ['movies'],
  data: function () {
    return {
      middleItem: this.movies.length / 2,
      actionsVisible: false,
      hoveredItem: null,
      favoriteHovered: false,
      movieMessage: null,
      addedMovieId: null
    }
  },
  methods: {
    showActions (index) {
      this.actionsVisible = !this.actionsVisible
      this.hoveredItem = index
    },
    hideActions () {
      this.actionsVisible = false
      this.hoveredItem = null
    },
    fillFavoriteButton () {
      this.favoriteHovered = true
    },
    unfillFavoriteButton () {
      this.favoriteHovered = false
    },
    isActionsVisible (index) {
      return this.actionsVisible && this.hoveredItem === index
    },
    increase: function () {
      this.middleItem += 1
    },
    decrease: function () {
      this.middleItem -= 1
    },
    showMovie: function (id) {
      this.$router.push({path: 'movie', query: { id }})
    },
    addToFavorites: function (id) {
      const exists = this.isMovieInFavorites(id)
      if (exists) {
        this.$store.dispatch(removeFromFavorites(id)).then(id => {
          this.movieMessage = 'Removed from favorites!'
          this.addedMovieId = id
          this.favoriteHovered = false

          setTimeout(() => {
            this.addedMovieId = null
          }, 2000)
        }).catch(err => {
          this.movieMessage = err.message
        })
      } else {
        this.$store.dispatch(addToFavorites(id)).then(id => {
          this.movieMessage = 'Added to favorites!'
          this.addedMovieId = id

          setTimeout(() => {
            this.addedMovieId = null
          }, 2000)
        }).catch(err => {
          this.movieMessage = err.message
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
.movie-item {
  position: relative;
  margin: 0 12px;
  width: 120px;
  /* height: 250px; */
  display: flex;
  flex-direction: column;
  transition: 0.3s;
  cursor: pointer;
}

.movie-item.centered {
  transform: scale(1.6);
  margin: 0 60px;
}

.movie-item > img {
  width: 100%;
  flex-basis: 80%;
}

.movie-item > h4 {
  margin-top: 10px;
  font-size: 15px;
  color: white;
}

.movie-item > .actions {
  position: absolute;
  top: 4px;
  right: 19px;
  color: white;
  opacity: 0;
  pointer-events: none;
  transition: 0.2s;
}

.movie-item > .actions.visible {
  opacity: 1;
  pointer-events: initial;
}

.movie-item > .actions > .actions-wrapper {
  position: relative;
  top: 0;
  right: 0;
}

/* .movie-item  */
.movie-item > .actions > .actions-wrapper > .favorites-button > i {
  transition: 0.3s;
  position: absolute;
  font-size: 15px;
}

.movie-item > .actions > .actions-wrapper > .favorites-button > i.hidden {
  opacity: 0;
  pointer-events: none;
}

.movie-item > .actions > .actions-wrapper > .favorites-button > i.visible {
  opacity: 1;
  pointer-events: initial;
}

.movie-item > .actions > .actions-wrapper > .favorites-button > .fas {
  color: #FF3A53;
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

.movie-item > .alert-message {
  position: absolute;
  top: 50px;
  right: -12px;
  left: -12px;
  max-width: 132px;
  display: flex;
  margin: auto 12px;
  justify-content: center;
  align-content: center;
  background-color: #33C1E7;
  border-radius: 8px;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.17);
}

.movie-item > .alert-message > .alert {
  display: inline;
  margin: 0;
  padding: 5px 10px;
  font-size: 8px;
  font-weight: bold;
  color: white;
  white-space: nowrap;
}

.movie-item > .alert-message.animated {
  animation: fadeInOutFromBelow 2s ease-in-out 0s forwards;
}

@keyframes fadeInOutFromBelow {
  0% {
    transform: translateY(200%);
    opacity: 0;
  }
  30% {
    transform: translateY(0);
    opacity: 1;
  }
  70% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-200%);
    opacity: 0;
  }
}
</style>
