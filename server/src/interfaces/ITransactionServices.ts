import ICreateTransactionData from './ICreateTransactionData'
import ICreateTransactionResponse from './ICreateTransactionResponse'
import IReadTransactionResponse from './IReadTransactionResponse'

export default interface ITransactionServices {
  create: (data: ICreateTransactionData, token: string) => Promise<ICreateTransactionResponse>
  read: (token: string) => Promise<IReadTransactionResponse[]>
}
