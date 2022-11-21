import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const loginValidationSchema = yup.object().shape({
  username: yup.string().required('Username é obrigatório'),

  password: yup.string().required('Senha obrigatória'),
})

export const loginValidation = yupResolver(loginValidationSchema)
