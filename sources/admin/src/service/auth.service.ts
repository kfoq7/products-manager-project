import { client } from '@/lib/axios'
import { AuthLogin } from '@/types/auth'

export const login = async (data: AuthLogin) => {
  return client.post('/auth/login', data).then(response => response.data)
}

export const register = async (data: AuthLogin) => {
  return client.post('/auth/register', data).then(response => response.data)
}
