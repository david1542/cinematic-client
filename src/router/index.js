import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'
import SearchPage from '@/pages/SearchPage'
import MoviePage from '@/pages/MoviePage'
import MoviePlayerPage from '@/pages/MoviePlayerPage'
import FavoritesPage from '@/pages/FavoritesPage'
import RegisterPage from '@/pages/RegisterPage'
import LoginPage from '@/pages/LoginPage'
import store from '../store'

Vue.use(Router)

const ifAuthenticated = (to, from, next) => {
  if (store.getters['user/isAuthenticated']) {
    next()
    return
  }
  next('/login')
}

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters['user/isAuthenticated']) {
    next()
    return
  }
  next('/')
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/search',
      name: 'SearchPage',
      component: SearchPage,
      beforeEnter: ifAuthenticated,
      props: true
    },
    {
      path: '/movie',
      name: 'MoviePage',
      component: MoviePage,
      beforeEnter: ifAuthenticated,
      props: true
    },
    {
      path: '/watch',
      name: 'MoviePlayer',
      component: MoviePlayerPage,
      beforeEnter: ifAuthenticated,
      props: true
    },
    {
      path: '/favorites',
      name: 'FavoritesPage',
      component: FavoritesPage,
      beforeEnter: ifAuthenticated,
      props: true
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component: RegisterPage,
      beforeEnter: ifNotAuthenticated,
      props: true
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage,
      beforeEnter: ifNotAuthenticated,
      props: true
    }
  ]
})
