import { PrismaClient } from '@prisma/client'
import IUserServices from '../interfaces/IUserServices'
import CustomError from '../utils/error-handling/custom-error'
import statusCodes from 'http-status-codes'
import PasswordHandler from '../utils/password-handler'
import ICreateUserResponse from '../interfaces/ICreateUserResponse'
import tokenHandler from '../utils/jwt'
import ILoginData from '../interfaces/ILoginData'
import ILoginResponse from '../interfaces/ILoginResponse'
import ICreateUserData from '../interfaces/ICreateUserData'
import IReadOneUserResponse from '../interfaces/IReadOneUserResponse'

export default class UserServices implements IUserServices {
  constructor (private readonly prisma: PrismaClient) {}

  async create (data: ICreateUserData): Promise<ICreateUserResponse> {
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

    return {
      id: user.id,
      username: user.username,
      accountId: user.accountId,
      token: tokenHandler.createToken({ id: user.id, username: user.username, accountId: user.accountId })
    }
  }

  async login (data: ILoginData): Promise<ILoginResponse> {
    const user = await this.prisma.user.findUnique({
      where: { username: data.username }
    })

    if (user === null) throw new CustomError(statusCodes.NOT_FOUND, 'User not found')

    const isPasswordCorrect = await PasswordHandler.compare(data.password, user.password)

    if (!isPasswordCorrect) throw new CustomError(statusCodes.UNAUTHORIZED, 'Invalid password')

    return {
      id: user.id,
      username: user.username,
      accountId: user.accountId,
      token: tokenHandler.createToken({ id: user.id, username: user.username, accountId: user.accountId })
    }
  }

  async readOne (userId: string): Promise<IReadOneUserResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        accountId: true,
        account: {
          select: {
            balance: true
          }
        }
      }
    })

    if (user === null) throw new CustomError(statusCodes.NOT_FOUND, 'User not found')

    return {
      id: user.id,
      username: user.username,
      accountId: user.accountId,
      balance: user.account.balance
    }
  }

  private async _verifyUsername (username: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { username }
    })

    if (user !== null) throw new CustomError(statusCodes.CONFLICT, 'Username already exists')
  }
}
