<template>
  <h1 class="text-3xl">Usuários - {{ title }}</h1>
  <BaseLoader v-if="isLoadingData" class="my-4" />
  <template v-else>
    <div class="grid w-full lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mt-4">
      <InputText
        label="Nome"
        v-model="firstName"
        :error-message="formContext.errors.value.firstName"
      />
      <InputText
        label="Sobrenome"
        v-model="lastName"
        :error-message="formContext.errors.value.lastName"
      />
      <InputText label="E-mail" v-model="email" :error-message="formContext.errors.value.email" />
      <InputText label="Profissão" v-model="job" :error-message="formContext.errors.value.job" />
    </div>
    <div class="flex justify-end mt-4">
      <BaseButton
        class="mr-2"
        text="Voltar"
        icon="arrow-left"
        colorClass="bg-gray-600"
        @click="goToList()"
      />
      <BaseButton
        text="Salvar"
        icon="save"
        @click="onSubmit"
        :is-loading="isLoadingAction"
        color-class="bg-green-700"
      />
    </div>
  </template>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import type { User, UserForm } from '@/data/types/User'
import { useUsersSaveStore } from '@/stores/user/save'
import BaseButton from '@/components/BaseButton.vue'
import InputText from '@/components/forms/InputText.vue'
import BaseLoader from '@/components/BaseLoader.vue'
import { useFormManager } from '@/compositions/useFormManager'

const store = useUsersSaveStore()

const formContext = useForm<UserForm>({
  validationSchema: store.formSchema,
})
const [firstName] = formContext.defineField('firstName')
const [lastName] = formContext.defineField('lastName')
const [email] = formContext.defineField('email')
const [job] = formContext.defineField('job')

const { onSubmit, isLoadingAction, isLoadingData, goToList, title } = useFormManager<
  UserForm,
  User
>({
  formContext,
  service: store.service,
  mapEntityToForm: store.mapEntityToForm,
  resourcePath: 'users',
})
</script>

<style scoped></style>
