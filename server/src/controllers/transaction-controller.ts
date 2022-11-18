import { Request, Response } from 'express'
import ITransactionServices from '../interfaces/ITransactionServices'
import statusCodes from 'http-status-codes'

export default class TransactionController {
  constructor (private readonly transactionServices: ITransactionServices) {}

  async create (req: Request, res: Response): Promise<Response> {
    const transaction = await this.transactionServices.create(req.body, req.headers.authorization as string)
    return res.status(statusCodes.CREATED).json(transaction)
  }
}
