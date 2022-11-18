import { z } from 'zod'
import ZodValidation from '../utils/zod-validator'

export default class ValidateCreateTransaction extends ZodValidation {
  static schema = z.object({
    creditedAccountUsername: z
      .string({
        required_error: 'creditedAccountUsername is required',
        invalid_type_error: 'creditedAccountUsername must be a string'
      })
      .min(3, 'creditedAccountUsername must be at least 3 characters long'),

    value: z
      .number({
        required_error: 'value is required',
        invalid_type_error: 'value must be a number'
      })
  })
}
