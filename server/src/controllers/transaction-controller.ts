import { Request, Response } from 'express'
import ITransactionServices from '../interfaces/ITransactionServices'
import statusCodes from 'http-status-codes'

export default class TransactionController {
  constructor (private readonly transactionServices: ITransactionServices) {}

  async create (req: Request, res: Response): Promise<Response> {
    const transaction = await this.transactionServices.create(req.body, req.headers.authorization as string)
    return res.status(statusCodes.CREATED).json(transaction)
  }

  async read (req: Request, res: Response): Promise<Response> {
    const transactions = await this.transactionServices.read(req.headers.authorization as string)
    return res.status(statusCodes.OK).json(transactions)
  }

  async readFilteredByDate (req: Request, res: Response): Promise<Response> {
    const token = req.headers.authorization as string
    const { startDate, endDate } = req.query as { startDate: string, endDate: string }

    const transactions = await this.transactionServices.readFilteredByDate({ startDate, endDate }, token)
    return res.status(statusCodes.OK).json(transactions)
  }
}
