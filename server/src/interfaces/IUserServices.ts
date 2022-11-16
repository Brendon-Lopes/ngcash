import { User } from '@prisma/client'

export default interface IUserServices {
  create: (user: User) => Promise<User>
}
