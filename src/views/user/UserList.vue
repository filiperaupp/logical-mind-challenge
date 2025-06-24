<template>
  <div>
    <UserDeleteDialog v-model="showDeleteDialog" :user="selectedUser" @delete="reloadList" />
    <div class="flex flex-row">
      <h1 class="text-3xl">Usuários</h1>
      <BaseButton
        class="ml-4"
        text="Adicionar"
        icon="plus"
        colorClass="bg-green-700 hover:bg-green-800 focus:ring-green-300"
        @click="goToCreatePage"
      />
    </div>
    <div class="overflow-x-auto mt-4">
      <BaseTable :columns="['id', 'nome', 'e-mail', 'ações']" :is-loading="isLoading">
        <tr v-for="user in users" :key="user.id" class="border-t last:border-b">
          <td class="px-4 py-3">{{ user.id }}</td>
          <td class="px-4 py-3 hidden md:table-cell">{{ user.firstName }} {{ user.lastName }}</td>
          <td class="px-4 py-3 hidden sm:table-cell">{{ user.email }}</td>
          <td class="px-4 py-3 flex gap-1">
            <BaseButton icon="eye" />
            <BaseButton icon="pencil" @click="goToEditPage(user.id)" />
            <BaseButton
              icon="trash"
              colorClass="bg-red-700 hover:bg-red-800 focus:ring-red-300"
              @click="handleDelete(user.id)"
            />
          </td>
        </tr>
      </BaseTable>
    </div>
    <ListPaginatation
      v-model="pagination.page"
      class="mt-4"
      :pages="pagination.totalPages"
      @pageChange="loadData({ page: $event })"
    />
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BaseTable from '@/components/BaseTable.vue'
import ListPaginatation from '@/components/ListPaginatation.vue'
import axios from 'axios'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import UserDeleteDialog from './UserDeleteDialog.vue'

interface GetRequestParmas {
  page: number
  perPage?: number
  search?: string
}

const router = useRouter()

const goToCreatePage = () => {
  router.push('/users/save')
}

const goToEditPage = (id: number) => {
  router.push(`/users/save/${id}`)
}

const isLoading = ref(false)
const users = ref([])
const pagination = reactive({ page: 1, totalPages: 1 })
const selectedUser = ref()

const handleDelete = (id: number) => {
  selectedUser.value = users.value.find((user) => user.id === id)
  showDeleteDialog.value = true
}

const loadData = ({ page, perPage = 10, search = '' }: GetRequestParmas) => {
  isLoading.value = true
  axios
    .get('http://localhost:5173/api/users', { params: { page, perPage, search } })
    .then(({ data }) => {
      console.log(data)
      users.value = data.result
      pagination.totalPages = data.meta.totalPages
    })
    .finally(() => {
      isLoading.value = false
    })
}
loadData({ page: 1 })

const reloadList = () => {
  loadData({ page: pagination.page })
}

const showDeleteDialog = ref(false)
</script>

<style scoped></style>
