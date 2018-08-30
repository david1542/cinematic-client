<template>
  <div class="search-bar">
    <input type="text" class="form-control" v-model="query" v-on:keydown.enter="onSearch" placeholder="Type something here..." />
    <button class="btn btn-primary mt-3" v-on:click="onSearch">Search</button>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data: function () {
    return {
      query: null
    }
  },
  methods: {
    onSearch: function () {
      this.$emit('search-movie', this.query)
    }
  }
}
</script>

<style scoped>
  .search-bar {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
  }
  .title {
    font-size: 20px;
    color: white;
  }
  input[type="text"] {
    width: 400px;
  }
</style>
