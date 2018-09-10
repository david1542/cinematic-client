<template>
  <div class="search-page">
    <div class="header">
      <h1 class="display-4">
        Hello from search page
      </h1>
    </div>
    <div class="movie-list">
      <div
        class="movie-item"
        v-for="movie in movies"
        v-bind:key="movie.id"
      >
        <div class="movie-img">
          <img v-bind:src="movie.poster" alt="Movie Poster" />
        </div>
        <div class="content">
          <h2 class="title">{{ movie.original_title }}</h2>
          <p class="overview">{{ movie.overview }}</p>
          <button class="btn btn-primary" v-on:click="showMovie(movie.id)">Explore More!</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchPage',
  data: function () {
    return {
      movies: null,
      err: null
    }
  },
  mounted: function () {
    // const { query } = this.$router.history.current.query
    // movie.search
  },
  methods: {
    showMovie: function (id) {
      this.$router.push({path: 'movie', query: { id }})
    }
  }
}
</script>

<style>
.search-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  width: 100%;
  background-image: url('../assets/theater.jpg');
  background-size: 100vw 100vh;
  background-attachment: fixed;
}

.search-page > .header {
  padding: 12px 40px;
  display: flex;
  width: 100%;
}

.search-page > .header > h1 {
  color: white;
  font-size: 29px;
}

.movie-list {
  display: flex;
  flex-direction: column;
  padding: 8px 40px;
  width: 100%;
}

.movie-list > .movie-item {
  display: flex;
  margin-bottom: 40px;
  height: 400px;
}

.movie-list > .movie-item > .movie-img {
  height: 100%;
  margin-right: 20px;
  flex-basis: 20%;
}
.movie-list > .movie-item .movie-img > img {
  /* width: 250px; */
  width: 100%;
  height: 100%;
}

.movie-list > .movie-item > .content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-basis: 80%;
}
.movie-list > .movie-item > .content > .title {
  color: white;
  font-size: 25px;
  font-weight: bold;
}

.movie-list > .movie-item > .content > .overview {
  color: white;
  font-size: 18px;
  text-align: left;
}
</style>
