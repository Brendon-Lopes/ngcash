import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient({
  log: ['error', 'query', 'info', 'warn']
})

export default prismaClient
