import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home/Home.vue'
import * as guard from './guard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: () => import('../views/SignUp.vue')
    },
    {
      path: '/graph',
      name: 'graph',
      component: () => import('../views/Graph.vue')
    },
    {
      path: '/',
      component: Home,
      beforeEnter: guard.homeGuard,
      children: [
        {
          path: '',
          name: 'weather',
          component: () => import('../views/Home/Weather.vue')
        },
        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ '../views/Home/About.vue')
        }
      ]
    },

  ]

})
