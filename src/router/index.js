import Home from '@/views/Home.vue'
import GameScreen from '@/components/GameScreen.vue'
import Results from '@/views/Results.vue'
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/',
    name: 'Game',
    component: GameScreen
  },
  {
    path: '/results',
    name: 'Results',
    component: Results
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  props: true
})

export default router
