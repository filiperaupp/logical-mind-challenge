import { mapToUser } from '../mappers/userMapper'
import type { User, UserForm } from '../types/User'
import type { ListResponseType, ItemResponseType } from '@/utils/response'
import type { BaseService } from './BaseService'
import { api } from '@/utils/axiosConfig'

const RESOURCE_PATH = '/users'

interface UserListPaginateParams {
  page: number
  perPage?: number
  search?: string
  orderBy?: string
}

const service = (): BaseService<User, UserForm, UserListPaginateParams> => {
  const getAllPaginate = async ({
    page,
    perPage = 10,
    search = '',
    orderBy,
  }: UserListPaginateParams): Promise<ListResponseType<User[]>> => {
    const response = await api.get<ListResponseType<User[]>>(RESOURCE_PATH, {
      params: { page, perPage, search, orderBy },
    })
    response.data.result = response.data.result.map(mapToUser)
    return response.data
  }

  const getById = async (id: number): Promise<ItemResponseType<User>> => {
    const response = await api.get<ItemResponseType<User>>(`${RESOURCE_PATH}/${id}`)
    response.data.result = mapToUser(response.data.result)
    return response.data
  }

  const create = async (user: UserForm): Promise<User> => {
    const response = await api.post(RESOURCE_PATH, user)

    return mapToUser(response.data.result)
  }

  const update = async (id: number, user: UserForm): Promise<User> => {
    const response = await api.put(`${RESOURCE_PATH}/${id}`, user)
    return mapToUser(response.data.result)
  }

  const remove = async (id: number): Promise<void> => {
    return api.delete(`${RESOURCE_PATH}/${id}`)
  }

  return {
    getAllPaginate,
    create,
    update,
    getById,
    remove,
  }
}

export default service()
