import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/rank',
      name: 'rank',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Rank.vue')
    },
    {
      path: '/rule',
      name: 'rule',
      component: () => import(/* webpackChunkName: "about" */ './views/Rule.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import(/* webpackChunkName: "about" */ './views/User.vue')
    },
    {
      path: '/brand',
      name: 'brand',
      component: () => import(/* webpackChunkName: "about" */ './views/Brand.vue')
    }
  ]
})
