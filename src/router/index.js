import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import SearchPage from '@/components/SearchPage'
import MoviePage from '@/components/MoviePage'
import RegisterPage from '@/components/RegisterPage'
import LoginPage from '@/components/LoginPage'

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
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component: RegisterPage,
      props: true
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage,
      props: true
    }
  ]
})
