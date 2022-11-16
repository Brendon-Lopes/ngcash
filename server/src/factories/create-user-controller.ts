import UserController from '../controllers/user-controller'
import prismaClient from '../database/prismaClient'
import UserServices from '../services/user-services'

export default class CreateUserController {
  static make (): UserController {
    const userServices = new UserServices(prismaClient)
    const userController = new UserController(userServices)
    return userController
  }
}
