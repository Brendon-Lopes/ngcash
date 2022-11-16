import { PrismaClient, User } from '@prisma/client'
import IUserServices from '../interfaces/IUserServices'
import CustomError from '../utils/error-handling/custom-error'
import statusCodes from 'http-status-codes'
import PasswordHandler from '../utils/password-handler'
import ICreateUserResponse from '../interfaces/ICreateUserResponse'
import tokenHandler from '../utils/jwt'

export default class UserServices implements IUserServices {
  constructor (private readonly prisma: PrismaClient) {}

  async create (data: User): Promise<ICreateUserResponse> {
    await this._verifyUsername(data.username)

    const password = await PasswordHandler.hash(data.password)

    const user = await this.prisma.user.create({
      data: {
        username: data.username,
        password,
        account: {
          create: { }
        }
      }
    })

    const token = tokenHandler.createToken({ id: user.id, username: user.username })

    return {
      id: user.id,
      username: user.username,
      accountId: user.accountId,
      token
    }
  }

  private async _verifyUsername (username: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { username }
    })

    if (user !== null) throw new CustomError(statusCodes.CONFLICT, 'Username already exists')
  }
}
