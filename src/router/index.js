import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import SearchPage from '@/components/SearchPage'
import MoviePage from '@/components/MoviePage'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/search',
      name: 'SearchPage',
      component: SearchPage,
      props: true
    },
    {
      path: '/movie',
      name: 'MoviePage',
      component: MoviePage,
      props: true
    }
  ]
})
