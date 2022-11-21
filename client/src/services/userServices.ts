import { api } from '../providers/Api'

const login = async (username: string, password: string) => {
  const response = await api.post('/users/login', { username, password })
  return response.data
}

export { login }
