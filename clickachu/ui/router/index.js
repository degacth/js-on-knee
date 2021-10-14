import { createRouter, createWebHashHistory } from 'vue-router'
import MainMenu from '../views/MainMenu.vue'

const routes = [
  {
    path: '/',
    name: 'main-menu',
    component: MainMenu
  },
  {
    path: '/new-record',
    name: 'new-record',
    component: () => import('../views/NewRecord.vue')
  },
  {
    path: '/progress-record/:startUrl',
    name: 'progress-record',
    component: () => import('../views/ProgressRecord.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
