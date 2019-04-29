import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'login',
            component: () => import('../views/Login.vue')
        },
        {
            path: '/signUp',
            name: 'signUp',
            component: () => import('../views/SignUp.vue')
        },
        {
            path: '/home',
            component: Home,
            children: [
                {
                    path: '/',
                    name: 'weather',
                    component: () => import('../views/Weather.vue')
                },
                {
                    path: '/about',
                    name: 'about',
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
                }
            ]
        },

    ]
})
