<template>
  <div v-if="isAuthenticated">
    <v-navigation-drawer
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      temporary
      fixed
      app
      dark
    >
      <v-list class="pa-1 border-light">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-icon>
              fas fa-user
            </v-icon>
            <!-- <img src="https://randomuser.me/api/portraits/men/85.jpg"> -->
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ getUsername }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          @click.stop="item.title === 'Logout' && logout()"
          v-for="(item, i) in items"
          v-show="item.auth ? isAuthenticated : true"
          exact
          dark
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <div class="drawer-footer">
        Cinematic v1.0
      </div>
    </v-navigation-drawer>
    <v-toolbar app dark>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">
        <router-link :to="{name: 'HomePage'}" class="text-light brand">
          Cinematic
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="nav-items-wrapper" v-if="isAuthenticated">
        <v-btn
          icon
          v-if="!searchExpanded"
          @click="showSearch"
        >
          <v-icon>
            fas fa-search
          </v-icon>
        </v-btn>
        <v-text-field
          v-else
          v-model="searchTerm"
          @blur="hideSearch"
          @keydown.enter="search"
          placeholder="Type something..."
          color="error"
          v-focus
        />
      </div>
      <template v-else>
        <v-toolbar-items>
          <!-- <v-btn> -->
            <router-link :to="{name: 'RegisterPage'}">
              Register
            </router-link>
          <!-- </v-btn> -->
          <!-- <v-btn> -->
            <router-link :to="{name: 'LoginPage'}">
              Login
            </router-link>
          <!-- </v-btn> -->
        </v-toolbar-items>
      </template>
    </v-toolbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { logoutUser } from '../actions/creators'
export default {
  name: 'Navbar',
  data () {
    return {
      searchTerm: '',
      drawer: false,
      searchExpanded: false,
      clipped: false,
      miniVariant: false,
      items: [
        { icon: 'fas fa-home', title: 'Home', to: '/' },
        { icon: 'fas fa-film', title: 'Favorites', to: '/favorites', auth: true },
        { icon: 'fas fa-sign-out-alt', title: 'Logout', auth: true }
      ]
    }
  },
  directives: {
    focus: {
      inserted (el) {
        const classNames = '.' + el.className.split(' ').join('.')
        el.querySelector(classNames + ' input').focus()
      }
    }
  },
  methods: {
    logout () {
      this.$store.dispatch(logoutUser()).then(() => {
        this.$router.push('/login')
      })
    },
    showSearch () {
      this.searchExpanded = true
    },
    hideSearch () {
      this.searchExpanded = false
    },
    search () {
      this.$router.push({
        name: 'SearchPage',
        query: {
          query: this.searchTerm
        }
      })
      this.searchExpanded = false
      this.searchTerm = ''
    }
  },
  computed: {
    ...mapGetters('user', [
      'isAuthenticated',
      'getUsername'
    ])
  }
}
</script>

<style>
.navbar {
  position: fixed;
  width: 100%;
  background-color: transparent !important;
  top: 0;
  z-index: 3;
  padding: 8px 60px 8px 30px;
}
@media screen and (max-width: 770px) {
  .navbar {
    padding-right: 30px;
  }
}
.navbar-collapse {
  bottom: 0;
  top: 0;
  left: 0;
  z-index: 5;
  transform: translateX(-100%);
  height: 100vh;
  background-color: white;
  display: none;
}

.navbar-collapse.show {
  transform: translateX(-100%);
}
.shrink .search {
  width: 50px;
}
.navbar a {
  text-decoration: none;
  color: white;
}

.navbar .guest-links > h4 > .line {
  width: 2px;
  display: inline-block;
  height: 17px;
  margin-bottom: -3px;
  background-color: white;
}

.navbar .user-dropdown-button {
  font-size: 18px;
  display: inline;
}

.dropdown-toggle::after {
  width: 0;
  height: 0;
  margin-left: 0.255em;
  vertical-align: 0.255em;
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 8px;
  border-top: 0.3em solid;
  border-right: 0.3em solid transparent;
  border-bottom: 0;
  border-left: 0.3em solid transparent;
}
.navbar .guest-links > h4 > a {
  position: relative;
  font-size: 18px;
}
.navbar .dropdown-item {
  color: black
}
.dropdown-title {
  pointer-events: none;
  font-size: 15px;
  font-weight: bold;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 8px;
  padding-bottom: 8px;
}
.dropdown-menu {
  padding-top: 0;
}
.dropdown-title:focus {
  background: transparent !important;
}

.search {
  border-radius: 30px;
  border: 2px solid white;
  padding-left: 15px;
}

.search,
.search:focus {
  background-color: transparent;
  color: white;
}

.search::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: white;
    opacity: 1; /* Firefox */
}

.search:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: white;
}

.search::-ms-input-placeholder { /* Microsoft Edge */
    color: white;
}

.v-list__tile {
  cursor: pointer;
}

.v-list__tile:hover {
  background: hsla(0,0%,100%,.08);
}
@media screen and (max-width: 425px) {
  .theme--dark.v-navigation-drawer {
    width: 60% !important;
  }
}

.nav-items-wrapper {
  width: 400px;
  display: flex;
  flex-direction: row-reverse;
}

.nav-items-wrapper input {
  border-color: red !important;
}
.v-btn__content {
  width: 100%;
  height: 100%;
}

.v-toolbar__items > a {
  padding: 16px;
}

.v-toolbar__items > a,
.v-toolbar__items > a:hover {
  color: white;
  text-decoration: none;
  text-transform: capitalize;
  font-size: 16px;
  width: 100%;
  height: 100%;
}
.border-light {
  border-bottom: 1px solid white;
}
.drawer-footer {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  text-align: center;
  font-weight: bold;
  font-size: 15px;
  user-select: none;
  padding: 24px;
}
</style>
