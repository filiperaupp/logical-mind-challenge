import { createRouter, createWebHistory } from 'vue-router'
import UserList from '@/views/user/UserList.vue'
import UserSave from '@/views/user/UserSave.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/users',
    },
    {
      path: '/users',
      redirect: '/users/list',
      children: [
        { path: 'list', component: UserList },
        { path: 'save', component: UserSave },
      ],
    },
  ],
})

export default router
