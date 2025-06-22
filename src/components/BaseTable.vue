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
          <div class="flex justify-center items-center space-x-2">
            <div
              class="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"
            ></div>
            <span class="text-gray-600">Carregando dados...</span>
          </div>
        </td>
      </tr>
      <template v-else>
        <slot></slot>
      </template>
    </tbody>
  </table>
</template>

<script setup lang="ts">
defineProps<{
  isLoading: boolean
  columns: string[]
}>()
</script>

<style scoped></style>
