import { z } from 'zod'
import ZodValidation from '../utils/zod-validator'

export default class ValidateLogin extends ZodValidation {
  static schema = z.object({
    username: z
      .string({ required_error: 'username is required', invalid_type_error: 'username must be a string' }),

    password: z
      .string({ required_error: 'password is required', invalid_type_error: 'password must be a string' })
  })
}
