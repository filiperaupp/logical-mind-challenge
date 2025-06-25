<template>
  <BaseDialog v-bind="props" title="Excluir usuário" @update:model-value="close">
    <p class="m-0">
      Deseja realmente excluir o usuário
      <span class="font-bold">{{ user?.firstName }} {{ user?.lastName }}</span
      >?
    </p>

    <div class="flex justify-end mt-4">
      <BaseButton
        class="mr-2"
        text="Cancelar"
        icon="times"
        colorClass="bg-gray-600"
        @click="close"
      />
      <BaseButton
        text="Excluir"
        icon="trash"
        colorClass="bg-red-700"
        @click="deleteUser"
        :is-loading="isLoading"
      />
    </div>
  </BaseDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user/list'
import BaseButton from '@/components/BaseButton.vue'
import BaseDialog from '@/components/BaseDialog.vue'
import type { User } from '@/data/types/User'

const emit = defineEmits(['update:modelValue', 'delete'])
const props = defineProps<{
  modelValue: boolean
  user?: User
}>()

const store = useUserStore()

const close = () => {
  emit('update:modelValue', false)
}

const isLoading = ref(false)
const deleteUser = () => {
  if (!props.user) return
  isLoading.value = true
  store.service
    .remove(props.user.id)
    .then(() => {
      emit('delete')
      close()
    })
    .finally(() => {
      isLoading.value = false
    })
}
</script>

<style scoped></style>
