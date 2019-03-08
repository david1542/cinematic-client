import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import movie from './modules/movie'
import general from './modules/general'
// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    user,
    movie,
    general
  },
  strict: debug
  // plugins: [createPersistedState()]
})

export default store
