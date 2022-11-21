export default interface ITransaction {
  debitedValue: string
  debitedAccount: string
  creditedAccount: string
  type: string
  date: string
  relation: string
}
