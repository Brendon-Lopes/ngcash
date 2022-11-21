import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const passwordErrorMessage =
  'Senha deve conter pelo menos 8 caracteres com pelo menos uma letra maiúscula, uma letra minúscula e um número'

const registerValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username é obrigatório')
    .min(3, 'Username deve ter no mínimo 3 caracteres')
    .matches(/^[a-zA-Z0-9]+$/, 'Username deve conter apenas letras e números'),

  password: yup
    .string()
    .required('Senha obrigatória')
    .min(8, passwordErrorMessage)
    .matches(
      /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{8,20}$/,
      passwordErrorMessage
    ),
})

export const registerValidation = yupResolver(registerValidationSchema)
