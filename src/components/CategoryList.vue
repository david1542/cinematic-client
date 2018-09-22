<template>
  <div>
    <div
      v-for="category in categories"
      :key="category.name"
      class="category-wrapper"
    >
      <h2 class="category-name">{{ category.name }}</h2>
      <MovieGallery :movies="category.movies" />
    </div>
  </div>
</template>

<script>
import MovieGallery from './MovieGallery'
export default {
  name: 'CategoryList',
  props: {
    categories: {
      required: true,
      type: Array
    }
  },
  components: {
    MovieGallery
  }
}
</script>

<style scoped>
.category-wrapper {
  margin-bottom: 30px;
}
.category-name {
  font-size: 43px;
  text-align: center;
  color: white;
  margin-bottom: 100px;
  font-weight: bold;
}
.list-container {
  margin-bottom: 200px;
}
</style>
