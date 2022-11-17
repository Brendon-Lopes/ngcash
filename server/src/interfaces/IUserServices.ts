import ICreateUserData from './ICreateUserData'
import ICreateUserResponse from './ICreateUserResponse'
import ILoginData from './ILoginData'
import ILoginResponse from './ILoginResponse'
import IReadOneUserResponse from './IReadOneUserResponse'

export default interface IUserServices {
  create: (user: ICreateUserData) => Promise<ICreateUserResponse>
  login: (data: ILoginData) => Promise<ILoginResponse>
  readOne: (userId: string) => Promise<IReadOneUserResponse>
}
