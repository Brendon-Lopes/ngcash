import { Decimal } from '@prisma/client/runtime'

export default interface IReadOneUserResponse {
  id: string
  username: string
  accountId: string
  balance: Decimal
}
