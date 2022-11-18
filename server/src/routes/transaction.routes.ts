import { Router } from 'express'
import CreateTransactionController from '../factories/create-transaction-controller'
import ValidateToken from '../middlewares/validate-token'

const transactionRouter = Router()

const transactionController = CreateTransactionController.make()

transactionRouter.use(ValidateToken.execute)

transactionRouter.post(
  '/',
  async (req, res) => await transactionController.create(req, res)
)

export default transactionRouter
