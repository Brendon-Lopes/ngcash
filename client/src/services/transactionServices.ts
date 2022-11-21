import { ITransactionFilterOptions } from '../interfaces'
import ITransaction from '../interfaces/ITransaction'
import { api } from '../providers/Api'

const newTransaction = async (
  token: string,
  value: number,
  creditedAccountUsername: string
) => {
  const response = await api.post(
    '/transactions',
    {
      value: Number(value),
      creditedAccountUsername,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  )

  return response.data
}

const getTransactions = async (token: string): Promise<ITransaction[]> => {
  const response = await api.get('/transactions', {
    headers: {
      Authorization: token,
    },
  })

  return response.data
}

const getFilteredTransactions = async (
  token: string,
  filterOptions: ITransactionFilterOptions
): Promise<ITransaction[]> => {
  let startDate = ''
  let endDate = ''

  if (filterOptions.startDate !== '' && filterOptions.endDate !== '') {
    const start = new Date(filterOptions.startDate).setUTCHours(0, 0, 1)
    startDate = new Date(start).toISOString()

    const end = new Date(filterOptions.endDate).setUTCHours(24)
    endDate = new Date(end).toISOString()
  }

  let endpoint: string

  if (filterOptions.type === 'all') {
    endpoint = `/transactions/filter?startDate=${startDate}&endDate=${endDate}`
  } else {
    endpoint = `/transactions/filter?startDate=${startDate}&endDate=${endDate}&type=${filterOptions.type}`
  }

  const response = await api.get(endpoint, {
    headers: {
      Authorization: token,
    },
  })

  return response.data
}

export { newTransaction, getTransactions, getFilteredTransactions }
