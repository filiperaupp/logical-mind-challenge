<template>
  <div>
    <UserDeleteDialog v-model="showDeleteDialog" :user="selectedUser" @delete="store.reloadList" />
    <UserDetailDialog v-model="showDetailDialog" :user="selectedUser" />
    <div class="flex flex-row">
      <h1 class="text-3xl">Usuários</h1>
      <BaseButton
        class="ml-4"
        text="Adicionar"
        icon="plus"
        colorClass="bg-green-700 hover:bg-green-800 focus:ring-green-300"
        @click="store.goToSaveScreen()"
      />
      <BaseButton
        class="ml-2"
        text="Filtro"
        icon="filter"
        colorClass="bg-gray-500 hover:bg-gray-600"
        @click="showFilter = !showFilter"
      />
    </div>
    <UserFilter class="mt-4" v-if="showFilter" />
    <div class="overflow-x-auto mt-4">
      <BaseTable :columns="['nome', 'e-mail', 'ações']" :is-loading="isLoading">
        <template v-if="users.length === 0">
          <tr>
            <td colspan="4" class="px-4 py-3 text-center border-b">Nenhum usuário encontrado</td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="user in users" :key="user.id" class="border-t last:border-b">
            <td class="px-4 py-3 hidden md:table-cell">{{ user.firstName }} {{ user.lastName }}</td>
            <td class="px-4 py-3 hidden sm:table-cell">{{ user.email }}</td>
            <td class="px-4 py-3 flex gap-1">
              <BaseButton icon="eye" @click="handleDetail(user.id)" />
              <BaseButton icon="pencil" @click="store.goToSaveScreen(user.id)" />
              <BaseButton
                icon="trash"
                colorClass="bg-red-700 hover:bg-red-800 focus:ring-red-300"
                @click="handleDelete(user.id)"
              />
            </td>
          </tr>
        </template>
      </BaseTable>
    </div>
    <ListPaginatation
      v-model="pagination.page"
      class="mt-4"
      :pages="pagination.totalPages"
      @pageChange="store.paginateList($event)"
    />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseTable from '@/components/BaseTable.vue'
import ListPaginatation from '@/components/ListPaginatation.vue'
import UserDeleteDialog from './UserDeleteDialog.vue'
import UserDetailDialog from './UserDetailDialog.vue'

import { useUserStore } from '@/stores/user/list'
import { storeToRefs } from 'pinia'
import UserFilter from './UserFilter.vue'

const store = useUserStore()
const { isLoading, users, pagination, selectedUser } = storeToRefs(store)
const showFilter = ref(true)

const showDeleteDialog = ref(false)
const handleDelete = (id: number) => {
  store.upadteSelectedUser(id)
  showDeleteDialog.value = true
}

const showDetailDialog = ref(false)
const handleDetail = (id: number) => {
  store.upadteSelectedUser(id)
  showDetailDialog.value = true
}

onBeforeMount(() => {
  store.loadListData()
})
</script>

<style scoped></style>
