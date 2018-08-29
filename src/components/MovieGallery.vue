<template>
  <div class="list-container">
    <div class="movie-list" v-bind:style="{transform: 'translateX(' + getLeft + 'px)'}">
      <div
        class="movie-item"
        v-for="(movie, index) in movies"
        v-bind:key="movie.id"
        v-bind:class="{ centered: middleItem === index }"
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
.list-container {
  position: relative;
  width: 100vw;
}
.movie-item {
  margin: 0 12px;
  width: 120px;
  height: 250px;
  display: flex;
  flex-direction: column;
  transition: 0.3s;
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
  font-size: 15px;
  flex-basis: 20%;
  color: white;
}

.movie-list {
  display: flex;
  position: absolute;
  transition: 0.3s;
  margin-left: 41.5%;
  transform-origin: center;
}

.slide-buttons {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 200px;
  z-index: 2;
}

.slide-buttons > .button {
  position: absolute;
  display: inline-block;
  cursor: pointer;
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
