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
  const appliedFilter = ref<Record<string, any>>({})

  const routeRedirect = useRouteRedirect('users')

  const upadteSelectedUser = (id: number) => {
    selectedUser.value = users.value.find((user) => user.id === id)
  }

  const loadListData = (page = 1, params?: Record<string, any>) => {
    isLoading.value = true
    appliedFilter.value = params || {}
    userService
      .getAllPaginate({ page, ...params })
      .then((response) => {
        users.value = response.result
        pagination.totalPages = response.meta.totalPages
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  const paginateList = (page: number) => {
    console.log(appliedFilter.value)
    loadListData(page, appliedFilter.value)
  }

  const filterList = (search: string, orderBy: string) => {
    pagination.page = 1
    loadListData(1, { search, orderBy })
  }

  const reloadList = () => {
    // se for o último registro da lista e a pagina for maior que 1, automaticamente busca a página anterior
    if (users.value.length === 1 && pagination.page > 1) {
      console.log('here')
      pagination.page = pagination.page - 1
    }
    loadListData(pagination.page, appliedFilter.value)
  }

  return {
    isLoading,
    users,
    pagination,
    selectedUser,
    service: userService,
    upadteSelectedUser,
    loadListData,
    paginateList,
    filterList,
    reloadList,
    ...routeRedirect,
  }
})
