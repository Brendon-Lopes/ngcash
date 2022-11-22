import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const transactionValidationSchema = yup.object().shape({
  creditedAccountUsername: yup
    .string()
    .required('Username é obrigatório')
    .min(3, 'Username deve ter no mínimo 3 caracteres')
    .matches(/^[a-zA-Z0-9]+$/, 'Username deve conter apenas letras e números'),

  value: yup
    .number()
    .min(0.01, 'Valor deve ser maior que 0')
    .required('Valor é obrigatório')
    .typeError('Valor deve conter apenas números e ponto'),
})

export const transactionValidation = yupResolver(transactionValidationSchema)
