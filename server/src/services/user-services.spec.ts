import sinon from 'sinon'
import chai from 'chai'
import UserServices from './user-services'
import { createUserDataMock, createUserPrismaResponseMock, createUserResponseMock, readOneUserPrismaResponseMock, readOneUserResponseMock } from '../utils/mocks/user-mocks'
import tokenHandler from '../utils/jwt'
import PasswordHandler from '../utils/password-handler'
import CustomError from '../utils/error-handling/custom-error'
import statusCodes from 'http-status-codes'
import { mockedPrisma } from '../utils/mocks/prisma-mock'

const { expect } = chai

describe('User Services', () => {
  const userServices = new UserServices(mockedPrisma as any)

  describe('Create method', () => {
    afterEach(() => sinon.restore())

    it('should create a new user', async () => {
      sinon.stub(mockedPrisma.user, 'findUnique').resolves(null)
      sinon.stub(mockedPrisma.user, 'create').resolves(createUserPrismaResponseMock)
      sinon.stub(tokenHandler, 'createToken').returns('validtoken')

      const user = await userServices.create(createUserDataMock)
      expect(user).to.be.deep.equal(createUserResponseMock)
    })
  })

  describe('Login method', () => {
    afterEach(() => sinon.restore())

    it('should login a user', async () => {
      sinon.stub(mockedPrisma.user, 'findUnique').resolves(createUserPrismaResponseMock)
      sinon.stub(PasswordHandler, 'compare').resolves(true)
      sinon.stub(tokenHandler, 'createToken').returns('validtoken')

      const loginResponse = await userServices.login(createUserDataMock)
      expect(loginResponse).to.be.deep.equal(createUserResponseMock)
    })

    it('should throw an error if the user does not exist', async () => {
      sinon.stub(mockedPrisma.user, 'findUnique').resolves(null)

      try {
        await userServices.login(createUserDataMock)
      } catch (error) {
        expect(error).to.be.instanceOf(CustomError)
        expect(error).to.have.property('status', statusCodes.NOT_FOUND)
      }
    })
  })

  describe('ReadOne method', () => {
    afterEach(() => sinon.restore())

    it('should return one user', async () => {
      sinon.stub(mockedPrisma.user, 'findUnique').resolves(readOneUserPrismaResponseMock)
      sinon.stub(tokenHandler, 'verifyToken').returns({ id: 'clak46hxp0000o89qiv0tiggt' })

      const user = await userServices.readOne('validtoken')
      expect(user).to.be.deep.equal(readOneUserResponseMock)
    })
  })
})
