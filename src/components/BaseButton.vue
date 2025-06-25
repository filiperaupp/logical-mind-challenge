<template>
  <button
    class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded focus:ring-4 focus:outline-none cursor-pointer"
    :class="colorClass"
    :disabled="disabled || isLoading"
  >
    <template v-if="isLoading">
      <BaseLoader color-class="border-white" :with-text="false" />
    </template>
    <template v-else>
      <span v-if="text" class="mr-2">{{ text }}</span>
      <i :class="`fas fa-${icon} w-3.5 h-3.5`"></i>
    </template>
  </button>
</template>

<script setup lang="ts">
import BaseLoader from './BaseLoader.vue'

withDefaults(
  defineProps<{
    icon: string
    text?: string
    color?: string
    colorClass?: string
    isLoading?: boolean
    disabled?: boolean
  }>(),
  {
    color: 'cyan',
    colorClass: 'bg-gray-400 hover:bg-gray-500 focus:ring-gray-300',
    isLoading: false,
    disabled: false,
  },
)
</script>

<style scoped></style>
