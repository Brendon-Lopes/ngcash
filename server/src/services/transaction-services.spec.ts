import sinon from 'sinon'
import chai from 'chai'
import TransactionServices from './transaction-services'
import { mockedPrisma } from '../utils/mocks/prisma-mock'
import tokenHandler from '../utils/jwt'
import { recipientAccountMock, recipientUserMock, senderAccountMock, senderUserMock } from '../utils/mocks/transaction-mocks'
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
})