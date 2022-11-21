import { PrismaClient } from '@prisma/client'
import { JwtPayload } from 'jsonwebtoken'
import ICreateTransactionData from '../interfaces/ICreateTransactionData'
import ICreateTransactionResponse from '../interfaces/ICreateTransactionResponse'
import ITransactionServices from '../interfaces/ITransactionServices'
import CustomError from '../utils/error-handling/custom-error'
import tokenHandler from '../utils/jwt'
import statusCodes from 'http-status-codes'
import IReadTransactionResponse from '../interfaces/IReadTransactionResponse'
import ITransactionFilter, { TransactionType } from '../interfaces/ITransactionFilter'

export default class TransactionServices implements ITransactionServices {
  constructor (private readonly prisma: PrismaClient) {}

  async create (data: ICreateTransactionData, token: string): Promise<ICreateTransactionResponse> {
    const { accountId: senderId } = tokenHandler.verifyToken(token) as JwtPayload

    const recipientAccountId = await this._getRecipientAccountIdByUsername(data.creditedAccountUsername)
    await this._validateAccountsNumber(senderId, recipientAccountId)
    await this._verifyIfAccountHasEnoughBalance(senderId, data.value)

    const sender = this.prisma.account.update({
      where: { id: senderId },
      data: { balance: { decrement: data.value } }
    })

    const recipient = this.prisma.account.update({
      where: { id: recipientAccountId },
      data: { balance: { increment: data.value } }
    })

    const transaction = this.prisma.transaction.create({
      data: {
        value: data.value,
        debitedAccount: {
          connect: { id: senderId }
        },
        creditedAccount: {
          connect: { id: recipientAccountId }
        }
      }
    })

    await this.prisma.$transaction([sender, recipient, transaction])
      .catch((err) => {
        console.log(err.message)

        throw new CustomError(
          statusCodes.INTERNAL_SERVER_ERROR,
          'An error occurred during the transaction, nothing was charged'
        )
      })

    return { debitedValue: data.value }
  }

  async read (token: string): Promise<IReadTransactionResponse[]> {
    const { accountId } = tokenHandler.verifyToken(token) as JwtPayload

    const transactions = await this.prisma.transaction.findMany({
      where: {
        OR: [
          { debitedAccountId: accountId },
          { creditedAccountId: accountId }
        ]
      },
      include: {
        creditedAccount: {
          include: {
            user: {
              select: {
                username: true
              }
            }
          }
        },
        debitedAccount: {
          include: {
            user: {
              select: {
                username: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return this._formatTransactions(transactions, accountId)
  }

  async readFilteredByDate (filter: ITransactionFilter, token: string): Promise<IReadTransactionResponse[]> {
    const { accountId } = tokenHandler.verifyToken(token) as JwtPayload

    let transactions

    if (filter.startDate !== '' && filter.endDate !== '') {
      transactions = await this._filterByDate(filter, accountId)
    } else {
      transactions = await this._getFromAllDates(accountId)
    }

    const formattedTransactions = this._formatTransactions(transactions, accountId)

    if (filter.type === undefined) return formattedTransactions

    return this._formatTransactionsByType(formattedTransactions, filter.type as TransactionType)
  }

  private async _filterByDate (filter: ITransactionFilter, accountId: string): Promise<any> {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        OR: [
          { debitedAccountId: accountId },
          { creditedAccountId: accountId }
        ],
        createdAt: {
          gte: new Date(filter.startDate),
          lte: new Date(filter.endDate)
        }
      },
      include: {
        creditedAccount: {
          include: {
            user: {
              select: {
                username: true
              }
            }
          }
        },
        debitedAccount: {
          include: {
            user: {
              select: {
                username: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return transactions
  }

  private async _getFromAllDates (accountId: string): Promise<any> {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        OR: [
          { debitedAccountId: accountId },
          { creditedAccountId: accountId }
        ]
      },
      include: {
        creditedAccount: {
          include: {
            user: {
              select: {
                username: true
              }
            }
          }
        },
        debitedAccount: {
          include: {
            user: {
              select: {
                username: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return transactions
  }

  private _formatTransactions (transactions: any[], accountId: string): IReadTransactionResponse[] {
    return transactions.map(transaction => ({
      debitedValue: transaction.value,
      debitedAccount: transaction.debitedAccountId,
      creditedAccount: transaction.creditedAccountId,
      type: transaction.debitedAccountId === accountId ? 'cash-out' : 'cash-in',
      date: transaction.createdAt,
      relation: transaction.debitedAccountId === accountId
        ? transaction.creditedAccount.user?.username
        : transaction.debitedAccount.user?.username
    }))
  }

  private _formatTransactionsByType (transactions: IReadTransactionResponse[], type: TransactionType): IReadTransactionResponse[] {
    return transactions.filter(transaction => transaction.type === type)
  }

  private async _verifyIfAccountHasEnoughBalance (accountId: string, value: number): Promise<void> {
    const account = await this.prisma.account.findUnique({
      where: { id: accountId }
    })

    if (account === null) throw new CustomError(statusCodes.NOT_FOUND, 'Account not found')

    if (Number(account.balance) < value) throw new CustomError(statusCodes.FORBIDDEN, 'Insufficient funds')
  }

  private async _validateAccountsNumber (senderAccountNumber: string, recipientAccountNumber: string): Promise<void> {
    if (senderAccountNumber === recipientAccountNumber) {
      throw new CustomError(statusCodes.FORBIDDEN, 'Cannot transfer to the same account')
    }

    const sender = this.prisma.account.findUnique({
      where: { id: senderAccountNumber }
    })

    const recipient = this.prisma.account.findUnique({
      where: { id: recipientAccountNumber }
    })

    await Promise.all([sender, recipient])

    if (sender === null) throw new CustomError(statusCodes.NOT_FOUND, 'Sender account not found')
    if (recipient === null) throw new CustomError(statusCodes.NOT_FOUND, 'Recipient account not found')
  }

  private async _getRecipientAccountIdByUsername (username: string): Promise<string> {
    const user = await this.prisma.user.findUnique({
      where: { username }
    })

    if (user === null) throw new CustomError(statusCodes.NOT_FOUND, 'Recipient account not found')

    return user.accountId
  }
}
