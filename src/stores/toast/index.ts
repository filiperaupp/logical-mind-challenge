import { defineStore } from 'pinia'
import { ref } from 'vue'

export type Toast = {
  id: number
  message: string
}

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<Toast[]>([])
  let counter = 0

  function showToast(message: string, duration = 4000) {
    const id = counter++
    toasts.value.push({ id, message })

    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id)
    }, duration)
  }

  return {
    toasts,
    showToast,
  }
})
