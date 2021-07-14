import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'

const routes = [
  {
    path: '/',
    component: Welcome,
  },
  {
    path: '/:username',
    component: function () {
      return import('../views/Chat.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
