import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/data/types/User'
import userService from '@/data/services/userService'
import { useRouteRedirect } from '@/compositions/useRouteRedirect'

export const useUserStore = defineStore('users', () => {
  const isLoading = ref(false)
  const users = ref<User[]>([])
  const pagination = reactive({ page: 1, totalPages: 1 })
  const selectedUser = ref()

  const routeRedirect = useRouteRedirect('users')

  const upadteSelectedUser = (id: number) => {
    selectedUser.value = users.value.find((user) => user.id === id)
  }

  const loadListData = (page = 1, search = '') => {
    isLoading.value = true
    userService
      .getAllPaginate({ page, search })
      .then((response) => {
        users.value = response.result
        pagination.totalPages = response.meta.totalPages
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  const reloadList = () => {
    loadListData(pagination.page)
  }

  return {
    isLoading,
    users,
    pagination,
    selectedUser,
    service: userService,
    upadteSelectedUser,
    loadListData,
    reloadList,
    ...routeRedirect,
  }
})
