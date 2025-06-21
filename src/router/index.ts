import { createRouter, createWebHistory } from 'vue-router'
import UserList from '@/views/user/UserList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: UserList,
    },
  ],
})

export default router
