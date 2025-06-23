import { setLocale } from 'yup'

setLocale({
  mixed: {
    required: 'O campo ${label} é obrigatório',
  },
  string: {
    email: 'E-mail inválido',
  },
})
