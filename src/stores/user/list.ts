import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/data/types/User'
import userService from '@/data/services/userService'
import { useRouteRedirect } from '@/compositions/useRouteRedirect'
import { useListData } from '@/compositions/useListData'

export const useUserStore = defineStore('users', () => {
  const routeRedirect = useRouteRedirect('users')

  const { list: users, ...listDataManager } = useListData<User>({ service: userService })

  return {
    users,
    ...listDataManager,
    service: userService,
    ...routeRedirect,
  }
})
