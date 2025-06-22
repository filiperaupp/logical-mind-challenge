<template>
  <div class="flex items-center justify-center space-x-2">
    <button
      v-for="index in pages"
      class="px-3 py-1 rounded cursor-pointer"
      :class="[index === currentPage ? selectedButtonClass : unselectedButtonClass]"
      @click="updatePage(index)"
    >
      {{ index }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedButtonClass = 'bg-cyan-600 text-white hover:bg-cyan-700'
const unselectedButtonClass = 'bg-gray-100 text-gray-700 hover:bg-gray-200'

defineProps<{
  pages: number
}>()
const emit = defineEmits(['pageChange'])

const currentPage = ref(1)
const updatePage = (index: number) => {
  if (index === currentPage.value) return
  currentPage.value = index
  emit('pageChange', index)
}
</script>

<style scoped></style>
