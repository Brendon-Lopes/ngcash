import sinon from 'sinon'
import chai from 'chai'
import TransactionServices from './transaction-services'
import { mockedPrisma } from '../utils/mocks/prisma-mock'
import tokenHandler from '../utils/jwt'
import { prismaTransactionsResponseMock, recipientAccountMock, recipientUserMock, senderAccountMock, senderUserMock, transactionServiceResponseMock } from '../utils/mocks/transaction-mocks'
import ICreateTransactionData from '../interfaces/ICreateTransactionData'

const { expect } = chai

describe('Transaction Services', () => {
  const transactionServices = new TransactionServices(mockedPrisma as any)

  describe('Create method', () => {
    afterEach(() => sinon.restore())

    it('should create a new transaction', async () => {
      sinon.stub(tokenHandler, 'verifyToken').returns({ accountId: senderUserMock.accountId })
      sinon.stub(mockedPrisma.user, 'findUnique').resolves(recipientUserMock)
      sinon.stub(mockedPrisma.account, 'findUnique')
        .onFirstCall().resolves(senderAccountMock)
        .onSecondCall().resolves(recipientAccountMock)
        .onThirdCall().resolves(senderAccountMock)
      sinon.stub(mockedPrisma.account, 'update').resolves()
      sinon.stub(mockedPrisma.transaction, 'create').resolves()
      sinon.stub(mockedPrisma, '$transaction').resolves()

      const createTransactionData: ICreateTransactionData = {
        creditedAccountUsername: recipientUserMock.username,
        value: 100
      }

      const response = await transactionServices.create(createTransactionData, 'validtoken')
      expect(response).to.be.deep.equal({ debitedValue: 100 })
      expect((mockedPrisma.$transaction as sinon.SinonStub).calledOnce).to.be.true
    })
  })

  describe('Read method', () => {
    afterEach(() => sinon.restore())

    it('should return all transactions related to the current account', async () => {
      sinon.stub(tokenHandler, 'verifyToken').returns({ accountId: senderUserMock.accountId })
      sinon.stub(mockedPrisma.transaction, 'findMany').resolves(prismaTransactionsResponseMock)

      const response = await transactionServices.read('validtoken')
      expect(response).to.be.deep.equal(transactionServiceResponseMock)
      expect((mockedPrisma.transaction.findMany as sinon.SinonStub).calledOnce).to.be.true
    })
  })

  describe('ReadFilteredByDate method', () => {
    afterEach(() => sinon.restore())

    it('should return all transactions related to the current account filtered by date', async () => {
      sinon.stub(tokenHandler, 'verifyToken').returns({ accountId: senderUserMock.accountId })
      sinon.stub(mockedPrisma.transaction, 'findMany').resolves(prismaTransactionsResponseMock)

      const response = await transactionServices.readFilteredByDate({ startDate: '2022-11-18T00:00:00.000Z', endDate: '2022-11-18T23:59:59.999Z' }, 'validtoken')
      expect(response).to.be.deep.equal(transactionServiceResponseMock)
      expect((mockedPrisma.transaction.findMany as sinon.SinonStub).calledOnce).to.be.true
    })
  })
})