import type { BaseService } from '@/data/services/BaseService'
import { reactive, ref } from 'vue'

export const useListData = <TEntity extends { id: number }>(options: {
  service: Pick<BaseService<TEntity, any, any>, 'getAllPaginate'>
}) => {
  const { service } = options

  const isLoading = ref(false)
  const list = ref<TEntity[]>([])
  const pagination = reactive({ page: 1, totalPages: 1 })
  const selectedUser = ref()
  const appliedFilter = ref<Record<string, any>>({})

  const upadteSelectedUser = (id: number) => {
    selectedUser.value = list.value.find((user) => user.id === id)
  }

  const loadListData = (page = 1, params?: Record<string, any>) => {
    isLoading.value = true
    appliedFilter.value = params || {}
    pagination.page = page
    service
      .getAllPaginate({ page, ...params })
      .then((response) => {
        list.value = response.result
        pagination.totalPages = response.meta.totalPages
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  const paginateList = (page: number) => {
    loadListData(page, appliedFilter.value)
  }

  const filterList = (search: string, orderBy: string) => {
    pagination.page = 1
    loadListData(1, { search, orderBy })
  }

  const reloadList = () => {
    // se for o último registro da lista e a pagina for maior que 1, automaticamente busca a página anterior
    if (list.value.length === 1 && pagination.page > 1) {
      pagination.page = pagination.page - 1
    }
    loadListData(pagination.page, appliedFilter.value)
  }

  return {
    isLoading,
    list,
    pagination,
    selectedUser,
    upadteSelectedUser,
    loadListData,
    paginateList,
    filterList,
    reloadList,
  }
}
