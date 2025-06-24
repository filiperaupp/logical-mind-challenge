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
      <BaseButton text="Excluir" icon="trash" colorClass="bg-red-700" @click="deleteUser" />
    </div>
  </BaseDialog>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BaseDialog from '@/components/BaseDialog.vue'
import axios from 'axios'
import { ref } from 'vue'

const props = defineProps<{
  modelValue: boolean
  user: any
}>()

const emit = defineEmits(['update:modelValue', 'delete'])

const close = () => {
  emit('update:modelValue', false)
}

const isLoading = ref(false)
const deleteUser = () => {
  isLoading.value = true
  axios
    .delete(`http://localhost:5173/api/users/${props.user.id}`)
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
