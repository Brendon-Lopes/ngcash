import { PrismaClient, User } from '@prisma/client'
import IUserServices from '../interfaces/IUserServices'

export default class UserServices implements IUserServices {
  constructor (private readonly prisma: PrismaClient) {}

  async create (data: User): Promise<User> {
    return await this.prisma.user.create({
      data: {
        username: data.username,
        password: data.password,
        account: {
          create: { }
        }
      }
    })
  }
}
