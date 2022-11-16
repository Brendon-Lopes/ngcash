import { User } from '@prisma/client'
import ICreateUserResponse from './ICreateUserResponse'
import ILoginData from './ILoginData'
import ILoginResponse from './ILoginResponse'

export default interface IUserServices {
  create: (user: User) => Promise<ICreateUserResponse>
  login: (data: ILoginData) => Promise<ILoginResponse>
}
