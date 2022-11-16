import { Router } from 'express'
import CreateUserController from '../factories/create-user-controller'

const userRouter = Router()

const userController = CreateUserController.make()

userRouter.post(
  '/',
  async (req, res) => await userController.create(req, res)
)

export default userRouter
