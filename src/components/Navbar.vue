<template>
  <b-navbar toggleable="md" type="dark" variant="light">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand href="#">
      <router-link to="/">
        Movies - Vue.js
        <i class="fas fa-film"></i>
      </router-link>
    </b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item class="text-light">
          <router-link to="/favorites">
            Favorites
          </router-link>
        </b-nav-item>
        <b-nav-item class="text-light">
          <router-link to="/search">
            Search
          </router-link>
        </b-nav-item>
      </b-navbar-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown v-if="isAuthenticated" right>
        <!-- Using button-content slot -->
        <template slot="button-content">
          <h4 class="text-light user-dropdown-button">Hello {{ getUsername }}!</h4>
        </template>
        <b-dropdown-item href="#">Profile</b-dropdown-item>
        <b-dropdown-item href="#" v-on:click="logout">Signout</b-dropdown-item>
      </b-nav-item-dropdown>
      <div v-else right class="guest-links">
        <h4 class="text-light">
          <router-link to="/login">Login</router-link>
          <span class="line"></span>
          <router-link to="/register">Register</router-link>
        </h4>
      </div>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters } from 'vuex'
import { logoutUser } from '../actions/creators'
export default {
  name: 'Navbar',
  methods: {
    logout () {
      this.$store.dispatch(logoutUser()).then(() => {
        this.$router.push('/login')
      })
    }
  },
  computed: {
    getUsername () {
      const { user } = this.$store.state.user

      if (user) {
        return user.firstName
      }

      return false
    },
    ...mapGetters('user', [
      'isAuthenticated'
    ])
  }
}
</script>

<style>
.navbar {
  position: absolute;
  width: 100%;
  background-color: transparent !important;
  top: 0;
  padding: 8px 60px 8px 30px;
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
</style>