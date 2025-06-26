<template>
  <div>
    <label :for="label" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <input
      class="mt-1 block w-full rounded-md border border-gray-500 px-4 py-2"
      :id="label"
      type="text"
      :value="modelValue"
      @input="handleInput($event)"
    />
    <small v-if="errorMessage" class="text-red-600" data-test="input-error-message">
      {{ errorMessage }}
    </small>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string | undefined
  label: string
  errorMessage?: string
}>()
const emit = defineEmits(['update:modelValue'])

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style scoped></style>
