import { User } from '@prisma/client'
import ICreateUserResponse from './ICreateUserResponse'

export default interface IUserServices {
  create: (user: User) => Promise<ICreateUserResponse>
}
