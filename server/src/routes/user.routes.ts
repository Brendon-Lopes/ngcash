import { Router } from 'express'
import CreateUserController from '../factories/create-user-controller'
import ValidateCreateUser from '../middlewares/validate-create-user'

const userRouter = Router()

const userController = CreateUserController.make()

userRouter.post(
  '/',
  (req, res, next) => ValidateCreateUser.validate(req, res, next),
  async (req, res) => await userController.create(req, res)
)

export default userRouter
