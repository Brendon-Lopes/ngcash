import ICreateTransactionData from './ICreateTransactionData'
import ICreateTransactionResponse from './ICreateTransactionResponse'

export default interface ITransactionServices {
  create: (data: ICreateTransactionData, token: string) => Promise<ICreateTransactionResponse>
}
