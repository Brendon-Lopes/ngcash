export const recipientUserMock = {
  id: 'clalpa41n0004qsrfgyzjqzb7',
  username: 'user2',
  accountId: 'clalpa41n0005qsrfhzzy3b0g'
}

export const senderUserMock = {
  id: 'clalpa1ic0000qsrfoxmrm5sz',
  username: 'user1',
  accountId: 'clalpa1ic0001qsrfmffcslg7'
}

export const recipientAccountMock = {
  id: 'clalpa41n0005qsrfhzzy3b0g',
  balance: 100
}

export const senderAccountMock = {
  id: 'clalpa1ic0001qsrfmffcslg7',
  balance: 100
}

export const prismaTransactionsResponseMock = [
  {
    id: 'clamqpi0a0008s00pso1ebzvh',
    debitedAccountId: 'clamqnqdu0005s00ptycfo6ng',
    creditedAccountId: 'clamqn1jn0001s00p9m0ovtgq',
    value: '10',
    createdAt: '2022-11-18T16:53:05.002Z',
    creditedAccount: {
      id: 'clamqn1jn0001s00p9m0ovtgq',
      balance: '112',
      user: {
        username: 'user1'
      }
    },
    debitedAccount: {
      id: 'clamqnqdu0005s00ptycfo6ng',
      balance: '88',
      user: {
        username: 'user2'
      }
    }
  }
]

export const transactionServiceResponseMock = [
  {
    debitedValue: '10',
    debitedAccount: 'clamqnqdu0005s00ptycfo6ng',
    creditedAccount: 'clamqn1jn0001s00p9m0ovtgq',
    type: 'cash-in',
    date: '2022-11-18T16:53:05.002Z',
    relation: 'user2'
  }
]
