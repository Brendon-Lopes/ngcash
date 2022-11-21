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
  let endpoint: string

  if (filterOptions.type === undefined) {
    endpoint = `/transactions/filter?startDate=${filterOptions.startDate}&endDate=${filterOptions.endDate}`
  } else {
    endpoint = `/transactions/filter?startDate=${filterOptions.startDate}&endDate=${filterOptions.endDate}&type=${filterOptions.type}`
  }

  const response = await api.get(endpoint, {
    headers: {
      Authorization: token,
    },
  })

  return response.data
}

export { newTransaction, getTransactions, getFilteredTransactions }
