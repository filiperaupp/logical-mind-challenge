<template>
  <h1 class="text-3xl">Usuários - {{ title }}</h1>
  <BaseLoader v-if="isLoadingData" class="my-4" />
  <template v-else>
    <div class="grid w-full lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
      <InputText label="Nome" v-model="firstName" :error-message="errors.firstName" />
      <InputText label="Sobrenome" v-model="lastName" :error-message="errors.lastName" />
      <InputText label="E-mail" v-model="email" :error-message="errors.email" />
      <InputText label="Profissão" v-model="job" :error-message="errors.job" />
    </div>
    <div class="flex justify-end mt-4">
      <BaseButton
        class="mr-2"
        text="Voltar"
        icon="arrow-left"
        colorClass="bg-gray-600"
        @click="goToList()"
      />
      <BaseButton text="Salvar" icon="save" @click="onSubmit" />
    </div>
  </template>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import BaseButton from '@/components/BaseButton.vue'
import InputText from '@/components/forms/InputText.vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import BaseLoader from '@/components/BaseLoader.vue'
import { ref } from 'vue'

const router = useRouter()
const route = useRoute()

const schema = yup.object({
  firstName: yup.string().required().label('Nome'),
  lastName: yup.string().required().label('Sobrenome'),
  email: yup.string().required().email().label('E-mail'),
  job: yup.string().required().label('Profissão'),
})

const { defineField, handleSubmit, errors, setValues } = useForm({
  validationSchema: schema,
})
const [firstName] = defineField('firstName')
const [lastName] = defineField('lastName')
const [email] = defineField('email')
const [job] = defineField('job')

const isLoadingData = ref(false)
const isLoadingAction = ref(false)

const id = route.params.id
if (id) {
  isLoadingData.value = true
  axios
    .get(`http://localhost:5173/api/users/${id}`)
    .then(({ data }) => {
      console.log(data)
      setValues(data.result)
    })
    .finally(() => {
      isLoadingData.value = false
    })
}
const title = id ? 'Editar' : 'Criar'

const goToList = () => {
  router.push('/users/list')
}

const onSubmit = handleSubmit((values) => {
  console.log('submit', values)
  isLoadingAction.value = true
  const saveRequest = id
    ? axios.put(`http://localhost:5173/api/users/${id}`, values)
    : axios.post('http://localhost:5173/api/users', values)
  saveRequest
    .then(() => {
      router.push('/users/list')
    })
    .finally(() => {
      isLoadingAction.value = false
    })
})
</script>

<style scoped></style>
