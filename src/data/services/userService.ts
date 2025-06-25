import axios from 'axios'
import { mapToUser } from '../mappers/userMapper'
import type { User, UserForm } from '../types/User'
import type { ListResponseType, ItemResponseType } from '@/utils/response'
import type { BaseService } from './BaseService'

const API_BASE = 'http://localhost:5173/api/users'

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
    const response = await axios.get<ListResponseType<User[]>>(API_BASE, {
      params: { page, perPage, search, orderBy },
    })
    response.data.result = response.data.result.map(mapToUser)
    return response.data
  }

  const getById = async (id: number): Promise<ItemResponseType<User>> => {
    const response = await axios.get<ItemResponseType<User>>(`${API_BASE}/${id}`)
    response.data.result = mapToUser(response.data.result)
    return response.data
  }

  const create = async (user: UserForm): Promise<User> => {
    const response = await axios.post(API_BASE, user)

    return mapToUser(response.data.result)
  }

  const update = async (id: number, user: UserForm): Promise<User> => {
    const response = await axios.put(`${API_BASE}/${id}`, user)
    return mapToUser(response.data.result)
  }

  const remove = async (id: number): Promise<void> => {
    return axios.delete(`${API_BASE}/${id}`)
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
