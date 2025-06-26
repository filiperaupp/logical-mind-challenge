<template>
  <div class="flex justify-center items-center space-x-2">
    <div
      class="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"
      :class="colorClass"
    ></div>
    <span v-if="withText" class="text-gray-600" data-test="loader-text">Carregando dados...</span>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    colorClass?: string
    withText?: boolean
  }>(),
  {
    colorClass: 'border-cyan-600',
    withText: true,
  },
)
</script>

<style scoped></style>
