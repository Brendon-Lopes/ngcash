import { Router } from 'express'
import CreateUserController from '../factories/create-user-controller'
import ValidateCreateUser from '../middlewares/validate-create-user'
import ValidateLogin from '../middlewares/validate-login'
import ValidateToken from '../middlewares/validate-token'

const userRouter = Router()

const userController = CreateUserController.make()

userRouter.post(
  '/',
  (req, res, next) => ValidateCreateUser.validate(req, res, next),
  async (req, res) => await userController.create(req, res)
)

userRouter.post(
  '/login',
  (req, res, next) => ValidateLogin.validate(req, res, next),
  async (req, res) => await userController.login(req, res)
)

userRouter.use(ValidateToken.execute)

userRouter.get(
  '/',
  async (req, res) => await userController.readOne(req, res)
)

export default userRouter
