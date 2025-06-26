<template>
  <table class="min-w-full text-sm text-left text-gray-700">
    <thead class="bg-gray-100 text-xs uppercase text-gray-600">
      <slot name="table-header"></slot>
    </thead>
    <tbody>
      <tr v-if="isLoading">
        <td :colspan="columns.length" class="py-6 text-center">
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
