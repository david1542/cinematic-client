<template>
  <div class="list-container">
    <div class="movie-list" v-bind:style="{transform: 'translateX(' + getLeft + 'px)'}">
      <div
        class="movie-item hvr-outline-in"
        v-for="(movie, index) in movies"
        v-bind:key="movie.id"
        v-bind:class="{ centered: middleItem === index }"
        v-on:click="showMovie(movie.id)"
      >
        <img v-bind:src="movie.poster" />
        <h4 class="movie-title">{{movie.original_title}}</h4>
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
export default {
  name: 'movie-gallery',
  props: ['movies'],
  data: function () {
    return {
      middleItem: this.movies.length / 2
    }
  },
  methods: {
    increase: function () {
      this.middleItem += 1
    },
    decrease: function () {
      this.middleItem -= 1
    },
    showMovie: function (id) {
      this.$router.push({path: 'movie', query: { id }})
    }
  },
  computed: {
    getLeft: function () {
      return this.middleItem * -144
    }
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
