const prismaFunctions = {
  findUnique: async (): Promise<any> => {},
  create: async (): Promise<any> => {},
  update: async (): Promise<any> => {}
}

export const mockedPrisma = {
  user: { ...prismaFunctions },
  account: { ...prismaFunctions },
  transaction: { ...prismaFunctions },
  $transaction: async (): Promise<any> => {}
}
