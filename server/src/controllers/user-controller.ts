import { Request, Response } from 'express'
import IUserServices from '../interfaces/IUserServices'
import statusCodes from 'http-status-codes'

export default class UserController {
  constructor (private readonly userServices: IUserServices) {}

  async create (req: Request, res: Response): Promise<Response> {
    const user = await this.userServices.create(req.body)
    return res.status(statusCodes.CREATED).json(user)
  }

  async login (req: Request, res: Response): Promise<Response> {
    const user = await this.userServices.login(req.body)
    return res.status(statusCodes.OK).json(user)
  }
}
