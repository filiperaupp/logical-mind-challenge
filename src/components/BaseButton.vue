<template>
  <button
    class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded focus:ring-4 focus:outline-none cursor-pointer"
    :class="colorClass"
  >
    <span v-if="text" class="mr-2">{{ text }}</span>
    <i :class="`fas fa-${icon} w-3.5 h-3.5`"></i>
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    icon: string
    text?: string
    color?: string
    colorClass?: string
  }>(),
  { color: 'cyan', colorClass: 'bg-gray-400 hover:bg-gray-500 focus:ring-gray-300' },
)
</script>

<style scoped></style>
