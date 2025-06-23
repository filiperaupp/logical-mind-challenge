<template>
  <div>User Save</div>
  <div class="grid w-full lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
    <InputText label="Nome" v-model="firstName" :error-message="errors.firstName" />
    <InputText label="Sobrenome" v-model="lastName" :error-message="errors.lastName" />
    <InputText label="E-mail" v-model="email" :error-message="errors.email" />
    <InputText label="Profissão" v-model="job" :error-message="errors.job" />
  </div>
  <div class="flex justify-end mt-4">
    <BaseButton text="Salvar" icon="save" @click="onSubmit" />
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import BaseButton from '@/components/BaseButton.vue'
import InputText from '@/components/forms/InputText.vue'

const schema = yup.object({
  firstName: yup.string().required().label('Nome'),
  lastName: yup.string().required().label('Sobrenome'),
  email: yup.string().required().email().label('E-mail'),
  job: yup.string().required().label('Profissão'),
})

const { defineField, handleSubmit, errors } = useForm({ validationSchema: schema })
const [firstName] = defineField('firstName')
const [lastName] = defineField('lastName')
const [email] = defineField('email')
const [job] = defineField('job')

const onSubmit = handleSubmit((values) => {
  console.log('submit', values)
})
</script>

<style scoped></style>
