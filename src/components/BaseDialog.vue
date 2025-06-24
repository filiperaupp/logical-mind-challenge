<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    @click.self="close"
  >
    <div class="p-4 border rounded-lg shadow bg-white space-y-4 relative m-6 min-w-sm">
      <h1 class="text-2xl">{{ title }}</h1>
      <BaseButton
        v-if="closeButton"
        class="absolute top-3 right-3"
        icon="times"
        color-class="bg-gray-500"
        @click="close"
      />
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from './BaseButton.vue'

withDefaults(
  defineProps<{
    modelValue: boolean
    title: string
    closeButton?: boolean
  }>(),
  { closeButton: false },
)

const emit = defineEmits(['update:modelValue'])

const close = () => {
  emit('update:modelValue', false)
}
</script>

<style scoped></style>
