<template>
  <div class="fixed bottom-4 right-4 space-y-3 z-50">
    <transition-group
      name="toast"
      enter-active-class="transition ease-out duration-300"
      leave-active-class="transition ease-in duration-300"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="w-80 p-4 rounded-lg shadow-lg border bg-red-100 border-red-300 text-red-800"
        data-test="toast"
      >
        <strong class="block font-semibold">Erro</strong>
        <p class="text-sm">{{ toast.message }}</p>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import type { Toast } from '@/stores/toast'

defineProps<{
  toasts: Toast[]
}>()
</script>
