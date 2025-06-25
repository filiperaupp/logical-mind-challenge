<template>
  <div class="p-4 bg-gray-100">
    <div class="grid w-full lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
      <InputText label="Nome ou sobrenome" v-model="search" />
      <InputSelect v-model="orderBy" label="Ordenar por" :options="orderByOptions" />
    </div>

    <div class="flex justify-end mt-4">
      <BaseButton
        class="mr-2"
        text="Limpar filtro"
        icon="broom"
        colorClass="bg-gray-500"
        @click="clearFilter"
      />
      <BaseButton
        text="Filtrar"
        icon="right-to-bracket"
        color-class="bg-cyan-600"
        @click="filter"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import InputSelect from '@/components/forms/InputSelect.vue'
import InputText from '@/components/forms/InputText.vue'
import { useUserStore } from '@/stores/user/list'
import { ref } from 'vue'

const store = useUserStore()

const search = ref('')
const orderBy = ref('id')

const orderByOptions = [
  { label: 'Ordem de inserção', value: 'id' },
  { label: 'Ordem alfabética', value: 'name' },
]

const filter = () => {
  store.filterList(search.value, orderBy.value)
}

const clearFilter = () => {
  search.value = ''
  orderBy.value = 'id'
}
</script>

<style scoped></style>
