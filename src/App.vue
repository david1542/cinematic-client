<template>
  <v-app>
    <Navbar />
    <v-content>
      <v-container fluid class="p-0 h-100">
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'
import Navbar from './components/Navbar'
import { logoutUser } from './actions/creators'
export default {
  name: 'App',
  components: {
    Navbar
  },
  created () {
    axios.interceptors.response.use(undefined, (err) => {
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
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
}

#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}

.brand,
.brand:hover {
  text-decoration: none;
}

.v-toolbar {
  background-color: transparent !important;
  box-shadow: none;
}
.v-content {
  padding-top: 0 !important;
}
.v-navigation-drawer > .v-list .v-list__tile--active .v-list__tile__title {
  color: white !important;
}

.v-list__tile.v-list__tile--link.theme--dark:hover {
  color: white !important;
  text-decoration: none;
}

.v-list__tile--active .v-list__tile__action:first-of-type .v-icon {
  color: white !important;
}

.v-overlay:before {
  background-color: rgb(0, 0, 0);
}

.v-overlay--active:before {
  opacity: 0.7;
}

.v-toolbar__side-icon {
  outline: none;
}
</style>
