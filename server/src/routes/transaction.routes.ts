import { Router } from 'express'
import CreateTransactionController from '../factories/create-transaction-controller'
import ValidateCreateTransaction from '../middlewares/validate-create-transaction'
import ValidateReadFilteredByDate from '../middlewares/validate-read-filtered-by-date'
import ValidateToken from '../middlewares/validate-token'

const transactionRouter = Router()

const transactionController = CreateTransactionController.make()

transactionRouter.use(ValidateToken.execute)

transactionRouter.post(
  '/',
  (req, res, next) => ValidateCreateTransaction.validate(req, res, next),
  async (req, res) => await transactionController.create(req, res)
)

transactionRouter.get(
  '/',
  async (req, res) => await transactionController.read(req, res)
)

transactionRouter.get(
  '/filter',
  (req, res, next) => ValidateReadFilteredByDate.validate(req, res, next),
  async (req, res) => await transactionController.readFilteredByDate(req, res)
)

export default transactionRouter
