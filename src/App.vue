<template>
  <v-app>
    <v-navigation-drawer
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
      dark
    >
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <!-- <v-icon v-html="item.icon"></v-icon> -->
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app dark>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">
        <router-link :to="{name: 'HomePage'}" class="text-light brand">
          Cinematic
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>
          fas fa-search
        </v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid class="p-0">
        <router-view></router-view>
      </v-container>
    </v-content>
</v-app>
</template>

<script>
import axios from 'axios'
import { logoutUser } from './actions/creators'
export default {
  name: 'App',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        { icon: 'apps', title: 'Home', to: '/' },
        { icon: 'apps', title: 'Favorites', to: '/favorites' },
        { icon: 'bubble_chart', title: 'Logout', to: '' }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
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

.brand,
.brand:hover {
  text-decoration: none;
}
</style>
