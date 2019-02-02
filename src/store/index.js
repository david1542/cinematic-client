import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import movie from './modules/movie'
// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    user,
    movie
  },
  strict: debug
  // plugins: [createPersistedState()]
})

export default store
