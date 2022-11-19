import sinon from 'sinon'
import chai from 'chai'
import TransactionServices from '../services/transaction-services'
import prismaClient from '../database/prismaClient'
import TransactionController from './transaction-controller'
import { Request, Response } from 'express'
import statusCodes from 'http-status-codes'
import { transactionServiceResponseMock } from '../utils/mocks/transaction-mocks'
import IReadTransactionResponse from '../interfaces/IReadTransactionResponse'

const { expect } = chai

describe('Transaction Controller', () => {
  const transactionServices = new TransactionServices(prismaClient)
  const transactionController = new TransactionController(transactionServices)

  const req = {} as Request
  const res = {} as Response

  before(() => {
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub()
  })

  describe('Create method', () => {
    afterEach(() => sinon.restore())

    it('should create a new transaction', async () => {
      const debitedValue = 100

      sinon.stub(transactionServices, 'create').resolves({debitedValue})
      req.body = { creditedAccountUsername: 'user1', value: 100 }
      req.headers = { authorization: 'token' }

      await transactionController.create(req, res)
      expect((res.status as sinon.SinonStub).calledWith(statusCodes.CREATED)).to.be.true
      expect((res.json as sinon.SinonStub).calledWith({debitedValue})).to.be.true
      req.body = {}
      req.headers = {}
    })
  })

  describe('Read method', () => {
    afterEach(() => sinon.restore())

    it('should return all transactions related to the current account', async () => {
      sinon.stub(transactionServices, 'read').resolves(transactionServiceResponseMock as unknown as IReadTransactionResponse[])

      await transactionController.read(req, res)
      expect((res.status as sinon.SinonStub).calledWith(statusCodes.OK)).to.be.true
      expect((res.json as sinon.SinonStub).calledWith(transactionServiceResponseMock)).to.be.true
    })
  })

  describe('ReadFilteredByDate method', () => {
    afterEach(() => sinon.restore())

    it('should return all transactions related to the current account filtered by date', async () => {
      sinon.stub(transactionServices, 'readFilteredByDate').resolves(transactionServiceResponseMock as unknown as IReadTransactionResponse[])
      req.query = { startDate: '2022-11-18T00:00:00.000Z', endDate: '2022-11-18T23:59:59.999Z' }

      await transactionController.readFilteredByDate(req, res)
      expect((res.status as sinon.SinonStub).calledWith(statusCodes.OK)).to.be.true
      expect((res.json as sinon.SinonStub).calledWith(transactionServiceResponseMock)).to.be.true
      req.query = {}
    })
  })
})
