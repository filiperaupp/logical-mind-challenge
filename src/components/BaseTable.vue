<template>
  <table class="min-w-full text-sm text-left text-gray-700">
    <thead class="bg-gray-100 text-xs uppercase text-gray-600">
      <tr>
        <th v-for="(column, index) in columns" :key="index" class="px-4 py-3">{{ column }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="isLoading">
        <td colspan="4" class="py-6 text-center">
          <BaseLoader />
        </td>
      </tr>
      <template v-else>
        <slot></slot>
      </template>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import BaseLoader from './BaseLoader.vue'

defineProps<{
  isLoading: boolean
  columns: string[]
}>()
</script>

<style scoped></style>
