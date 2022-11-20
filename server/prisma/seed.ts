import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createTransaction (value: number, debitedAccountId: string, creditedAccountId: string, date: string): Promise<void> {
  const transaction = prisma.transaction.create({
    data: { value, debitedAccountId, creditedAccountId, createdAt: new Date(date) }
  })

  const update1 = prisma.account.update({
    where: { id: debitedAccountId },
    data: { balance: { decrement: value } }
  })

  const update2 = prisma.account.update({
    where: { id: creditedAccountId },
    data: { balance: { increment: value } }
  })

  await Promise.all([transaction, update1, update2])
}

async function main (): Promise<void> {
  const user1 = prisma.user.create({
    data: {
      username: 'geralt',
      password: '$2b$10$G5uH9t4IzpQS7ACd7eMn1OUhEnXVAUMRkIkJWBhr/CgcC80E71DDy',
      account: {
        create: { }
      }
    }
  })

  const user2 = prisma.user.create({
    data: {
      username: 'yennefer',
      password: '$2b$10$G5uH9t4IzpQS7ACd7eMn1OUhEnXVAUMRkIkJWBhr/CgcC80E71DDy',
      account: {
        create: { }
      }
    }
  })

  const user3 = prisma.user.create({
    data: {
      username: 'ciri',
      password: '$2b$10$G5uH9t4IzpQS7ACd7eMn1OUhEnXVAUMRkIkJWBhr/CgcC80E71DDy',
      account: {
        create: {}
      }
    }
  })

  await Promise.all([user1, user2, user3])

  const users = await prisma.user.findMany()
  const [accountId1, accountId2, accountId3] = users.map(user => user.accountId)

  const transaction1 = createTransaction(20.32, accountId1, accountId2, '2022-11-01T00:00:00.000Z')
  const transaction2 = createTransaction(15.50, accountId2, accountId3, '2022-11-02T00:00:00.000Z')
  const transaction3 = createTransaction(10.25, accountId3, accountId1, '2022-11-03T00:00:00.000Z')
  const transaction4 = createTransaction(5.00, accountId1, accountId2, '2022-11-04T00:00:00.000Z')
  const transaction5 = createTransaction(8.99, accountId1, accountId3, '2022-11-05T00:00:00.000Z')
  const transaction6 = createTransaction(12.50, accountId1, accountId2, '2022-11-06T00:00:00.000Z')
  const transaction7 = createTransaction(7.50, accountId2, accountId1, '2022-11-07T00:00:00.000Z')

  await Promise.all(
    [transaction1, transaction2, transaction3, transaction4, transaction5, transaction6, transaction7]
  )
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
