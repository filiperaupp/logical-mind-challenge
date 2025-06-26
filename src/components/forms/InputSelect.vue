<template>
  <div>
    <label for="select" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <select
      id="select"
      class="mt-1 block w-full rounded-md border border-gray-500 px-4 py-2"
      :value="modelValue"
      @change="handleChange"
    >
      <option disabled value="">Selecione uma opção</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <small v-if="errorMessage" class="text-red-600" data-test="input-error-message">
      {{ errorMessage }}
    </small>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string | number | undefined
  label: string
  options: { label: string; value: string | number }[]
  errorMessage?: string
}>()

const emit = defineEmits(['update:modelValue'])

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>

<style scoped></style>
