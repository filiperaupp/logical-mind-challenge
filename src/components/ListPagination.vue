<template>
  <div class="flex items-center justify-center space-x-2">
    <button
      v-for="index in pages"
      class="px-3 py-1 rounded cursor-pointer"
      :class="[index === modelValue ? selectedButtonClass : unselectedButtonClass]"
      @click="updatePage(index)"
    >
      {{ index }}
    </button>
  </div>
</template>

<script setup lang="ts">
const selectedButtonClass = 'bg-cyan-600 text-white hover:bg-cyan-700'
const unselectedButtonClass = 'bg-gray-100 text-gray-700 hover:bg-gray-200'

const props = defineProps<{
  modelValue: number
  pages: number
}>()
const emit = defineEmits(['update:modelValue', 'pageChange'])

const updatePage = (index: number) => {
  if (index === props.modelValue) return
  emit('update:modelValue', index)
  emit('pageChange', index)
}
</script>

<style scoped></style>
