<template>
  <div>
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
          <td class="px-4 py-3 hidden md:table-cell">{{ user.first_name }} {{ user.last_name }}</td>
          <td class="px-4 py-3 hidden sm:table-cell">{{ user.email }}</td>
          <td class="px-4 py-3 flex gap-1">
            <BaseButton icon="eye" />
            <BaseButton icon="pencil" />
            <BaseButton icon="trash" colorClass="bg-red-700 hover:bg-red-800 focus:ring-red-300" />
          </td>
        </tr>
      </BaseTable>
    </div>
    <ListPaginatation class="mt-4" :pages="5" />
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BaseTable from '@/components/BaseTable.vue'
import ListPaginatation from '@/components/ListPaginatation.vue'
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToCreatePage = () => {
  router.push('/users/save')
}

const isLoading = ref(false)
const users = [
  {
    id: 2,
    email: 'janet.weaver@reqres.in',
    first_name: 'Janet',
    last_name: 'Weaver',
    avatar: 'https://reqres.in/img/faces/2-image.jpg',
  },
  {
    id: 3,
    email: 'emma.wong@reqres.in',
    first_name: 'Emma',
    last_name: 'Wong',
    avatar: 'https://reqres.in/img/faces/3-image.jpg',
  },
  {
    id: 4,
    email: 'eve.holt@reqres.in',
    first_name: 'Eve',
    last_name: 'Holt',
    avatar: 'https://reqres.in/img/faces/4-image.jpg',
  },
  {
    id: 5,
    email: 'charles.morris@reqres.in',
    first_name: 'Charles',
    last_name: 'Morris',
    avatar: 'https://reqres.in/img/faces/5-image.jpg',
  },
  {
    id: 6,
    email: 'tracey.ramos@reqres.in',
    first_name: 'Tracey',
    last_name: 'Ramos',
    avatar: 'https://reqres.in/img/faces/6-image.jpg',
  },
]

// axios
//   .get('https://reqres.in/api/users', { headers: { 'x-api-key': 'reqres-free-v1' } })
//   .then((data) => {
//     console.log(data)
//   })
</script>

<style scoped></style>
