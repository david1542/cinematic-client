<template>
    <div
        class="movie-item hvr-outline-in"
        :class="{ centered }"
        @click="showMovie"
        @mouseleave="hideActions"
        @mouseenter="showActions"
      >
        <img :src="movie.poster" />
        <h4 class="movie-title">{{movie.original_title}}</h4>
        <div class="actions" :class="{visible: actionsVisible}">
          <div class="actions-wrapper" v-if="isAuthenticated">
            <LikeButton @click="addToFavorites">
              <HeartButton :isActive="isFavorite" />
            </LikeButton>
          </div>
        </div>
        <div v-if="actionMessage && addedMovieId === movie.id" class="alert-message animated">
          <h4 class="alert">{{ actionMessage }}</h4>
        </div>
      </div>
</template>

<script>
import LikeButton from './LikeButton'
import HeartButton from './HeartButton'
export default {
  props: {
    movie: {
      required: true,
      type: Object
    },
    centered: {
      required: true,
      type: Boolean
    },
    isAuthenticated: {
      required: true,
      type: Boolean
    },
    isFavorite: {
      required: true,
      type: Boolean
    },
    actionMessage: {
      required: true,
      type: String
    },
    addedMovieId: {
      required: true
    }
  },
  components: {
    LikeButton,
    HeartButton
  },
  data () {
    return {
      actionsVisible: false
    }
  },
  methods: {
    addToFavorites () {
      this.$emit('favorite', { id: this.movie.id })
    },
    showMovie () {
      this.$emit('click', { id: this.movie.id })
    },
    showActions () {
      this.actionsVisible = true
    },
    hideActions () {
      this.actionsVisible = false
    }
  }
}
</script>

<style scoped>
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
