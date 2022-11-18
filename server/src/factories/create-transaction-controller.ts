import TransactionController from '../controllers/transaction-controller'
import prismaClient from '../database/prismaClient'
import TransactionServices from '../services/transaction-services'

export default class CreateTransactionController {
  static make (): TransactionController {
    const transactionServices = new TransactionServices(prismaClient)
    const transactionController = new TransactionController(transactionServices)
    return transactionController
  }
}
