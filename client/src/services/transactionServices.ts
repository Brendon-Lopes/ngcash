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

export { newTransaction }
