import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import SearchPage from '@/components/SearchPage'
import MoviePage from '@/components/MoviePage'
import MoviePlayer from '@/components/MoviePlayer'
import FavoritesPage from '@/components/FavoritesPage'
import RegisterPage from '@/components/RegisterPage'
import LoginPage from '@/components/LoginPage'
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
      component: MoviePlayer,
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
