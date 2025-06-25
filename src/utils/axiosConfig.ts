import { useToastStore } from '@/stores/toast'
import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:5173/api',
})

export const showErrorToast = (message: string) => {
  const store = useToastStore()
  store.showToast(message)
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.message || 'Erro inesperado ao processar a requisição.'
    showErrorToast(message)
    return Promise.reject(error)
  },
)
