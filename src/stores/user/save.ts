import { useFormManager } from '@/compositions/useFormManager'
import userService from '@/data/services/userService'
import type { User, UserForm } from '@/data/types/User'
import { defineStore } from 'pinia'
import { useForm, type FormContext } from 'vee-validate'
import { ref, type Ref } from 'vue'
import * as yup from 'yup'

export const useUsersSaveStore = defineStore('users-save', () => {
  const formSchema = yup.object({
    firstName: yup.string().required().label('Nome'),
    lastName: yup.string().required().label('Sobrenome'),
    email: yup.string().required().email().label('E-mail'),
    job: yup.string().required().label('Profissão'),
  })

  const mapEntityToForm = (entity: User): UserForm => ({
    firstName: entity.firstName,
    lastName: entity.lastName,
    email: entity.email,
    job: entity.job,
  })

  return {
    formSchema,
    service: userService,
    mapEntityToForm,
  }
})
