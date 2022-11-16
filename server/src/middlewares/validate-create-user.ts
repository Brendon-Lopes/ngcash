import { z } from 'zod'
import ZodValidation from '../utils/zod-validator'

export default class ValidateCreateUser extends ZodValidation {
  static schema = z.object({
    username: z
      .string({ required_error: 'username is required', invalid_type_error: 'username must be a string' })
      .min(3, 'username must be at least 3 characters long')
      .max(30, 'username must be at most 30 characters long')
      .regex(/^[a-zA-Z0-9]+$/, 'username must contain only letters and numbers and no spaces'),

    password: z
      .string({ required_error: 'password is required', invalid_type_error: 'password must be a string' })
      .regex(
        /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{8,20}$/,
        'password must be between 8 and 20 characters long and contain at least one uppercase letter, one lowercase letter and one number'
      )
  })
}
