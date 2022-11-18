import { Decimal } from '@prisma/client/runtime'

export default interface IReadTransactionResponse {
  debitedValue: Decimal
  debitedAccount: string
  creditedAccount: string
  type: string
  date: Date
  relation: string | undefined
}
