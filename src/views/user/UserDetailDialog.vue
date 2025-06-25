<template>
  <BaseDialog v-bind="props" title="Detalhes de usuário" close-button @update:model-value="close">
    <p v-if="!user">Nenhum usuário selecionado</p>
    <div v-else class="space-y-2">
      <div class="flex gap-2">
        <span class="font-medium">ID:</span>
        <span>{{ user.id }}</span>
      </div>
      <div class="flex gap-2">
        <span class="font-medium">Nome:</span>
        <span>{{ user.firstName }}</span>
      </div>
      <div class="flex gap-2">
        <span class="font-medium">Sobrenome:</span>
        <span>{{ user.lastName }}</span>
      </div>
      <div class="flex gap-2">
        <span class="font-medium">Email:</span>
        <span>{{ user.email }}</span>
      </div>
      <div class="flex gap-2">
        <span class="font-medium">Profissão:</span>
        <span>{{ user.job }}</span>
      </div>
    </div>
  </BaseDialog>
</template>

<script setup lang="ts">
import BaseDialog from '@/components/BaseDialog.vue'
import type { User } from '@/data/types/User'

const props = defineProps<{
  modelValue: boolean
  user?: User
}>()

const emit = defineEmits(['update:modelValue'])

const close = () => {
  emit('update:modelValue', false)
}
</script>

<style scoped></style>
