<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import axios from 'axios'
import { logoutUser } from './actions/creators'
export default {
  name: 'App',
  created: function () {
    axios.interceptors.response.use(undefined, function (err) {
      return new Promise((resolve, reject) => {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
        // if you ever get an unauthorized, logout the user
          this.$store.dispatch(logoutUser())
        // you can also redirect to /login if needed !
        }
        throw err
      })
    })
  }
}
</script>

<style>
html, body {
  height: 100%;
  width: 100%;
  margin: 0;
}

#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
