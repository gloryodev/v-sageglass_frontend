import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import MapView from '../views/MapView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'map-view',
    // name: 'home',
    // component: Home
    component: MapView
  },
  // {
  //   path: '/map-view',
  //   name: 'map-view',
  //   component: MapView
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
