<template>
  <nav>
    <div class="navbar-brand">
      <router-link :to="{name: 'HomePage'}">
        Movies - Vue.js
        <i class="fas fa-film"></i>
      </router-link>
    </div>
    <div class="nav-items">
      <router-link v-if="isAuthenticated" :to="{name: 'FavoritesPage'}">
        Favorites
      </router-link>
      <div class="">
        <form
          v-if="isAuthenticated"
          @submit.prevent="search"
        >
          <input 
            class="mr-sm-4 search"
            type="text"
            placeholder="Search"
            v-model="searchTerm"
          />
        </form>
      </div>
    </div>
  </nav>
  <b-navbar toggleable="md" type="dark" variant="light">
    
    <b-navbar-toggle target="nav_collapse" class="ml-auto"></b-navbar-toggle>    
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav >
        
      </b-navbar-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form
          
        >
          <b-form-input
            
          />
        </b-nav-form>
      <b-nav-item-dropdown v-if="isAuthenticated" right>
        <!-- Using button-content slot -->
        <template slot="button-content">
          <h4 class="text-light user-dropdown-button">
            <i class="fas fa-user" />
          </h4>
        </template>
        <b-dropdown-item href="#" class="dropdown-title">Hello {{ getUsername }}!</b-dropdown-item>
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
  data () {
    return {
      searchTerm: '',
      lastScrollY: 0,
      shrink: false
    }
  },
  mounted () {
    window.addEventListener('scroll', function (e) {
      var scrollY = window.scrollY
      console.log(scrollY)
      if (scrollY > this.lastScrollY) {
        this.shrink = true
      } else {
        this.shrink = false
      }

      this.lastScrollY = scrollY
    }.bind(this))
  },
  methods: {
    logout () {
      this.$store.dispatch(logoutUser()).then(() => {
        this.$router.push('/login')
      })
    },
    search () {
      this.$router.push({
        name: 'SearchPage',
        query: {
          query: this.searchTerm
        }
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
</style>
