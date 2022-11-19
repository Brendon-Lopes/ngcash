export type TransactionType = 'cash-in' | 'cash-out'

export default interface ITransactionFilter {
  startDate: string
  endDate: string
  type?: 'cash-out' | 'cash-in'
}
