<template>
    <div class="movie-item">
      <div class="movie-img">
        <img :src="movie.poster" alt="Movie Poster" />
      </div>
      <div class="content">
        <h2 class="title">{{ movie.title }}</h2>
        <p class="overview">{{ movie.overview }}</p>
        <router-link class="btn btn-primary" :to="{name: 'MoviePage', params: {id: movie.id}}">
          {{ $t('exploreMore') }}
        </router-link>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    movie: {
      required: true,
      type: Object
    }
  }
}
</script>

<style scoped>

.movie-item {
  display: flex;
  margin-bottom: 40px;
  height: 400px;
}

.rtl .movie-item {
  flex-direction: row-reverse;
}

.movie-item > .movie-img {
  height: 100%;
  margin-right: 20px;
  flex-basis: 20%;
}

.rtl .movie-item > .movie-img {
  margin-right: 0;
  margin-left: 20px;
}

.movie-item .movie-img > img {
  width: 250px;
  /* width: 100%; */
  height: 100%;
}

.movie-item > .content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-basis: 80%;
}

.rtl .movie-item > .content {
  direction: rtl;
}

.movie-item > .content > .title {
  color: white;
  font-size: 25px;
  font-weight: bold;
}

.movie-item > .content > .overview {
  color: white;
  font-size: 18px;
  text-align: left;
}

.rtl .movie-item > .content > .overview {
  text-align: right;
}
</style>
