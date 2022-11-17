import sinon from 'sinon'
import chai from 'chai'
import UserController from './user-controller'
import statusCodes from 'http-status-codes'
import UserServices from '../services/user-services'
import prismaClient from '../database/prismaClient'
import { Request, Response } from 'express'
import { createUserResponseMock } from '../utils/mocks/user-mocks'

const { expect } = chai

describe('User Controller', () => {
  const userServices = new UserServices(prismaClient)
  const userController = new UserController(userServices)

  const req = {} as Request
  const res = {} as Response

  before(() => {
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub()
  })

  describe('Create method', () => {
    afterEach(() => sinon.restore())

    it('should create a new user', async () => {
      sinon.stub(userServices, 'create').resolves(createUserResponseMock)

      await userController.create(req, res)
      expect((res.status as sinon.SinonStub).calledWith(statusCodes.CREATED)).to.be.true
      expect((res.json as sinon.SinonStub).calledWith(createUserResponseMock)).to.be.true
    })
  })

  describe('Login method', () => {
    afterEach(() => sinon.restore())

    it('should login a user', async () => {
      sinon.stub(userServices, 'login').resolves(createUserResponseMock)

      await userController.login(req, res)
      expect((res.status as sinon.SinonStub).calledWith(statusCodes.OK)).to.be.true
      expect((res.json as sinon.SinonStub).calledWith(createUserResponseMock)).to.be.true
    })
  })
})
