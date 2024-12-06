'use client'

import { login } from '@/service/auth.service'
import { AuthLogin } from '@/types/auth'
import { useMutation } from '@tanstack/react-query'

export function useLogin() {
  const { data, isError, mutate } = useMutation({
    mutationFn: (data: AuthLogin) => login(data),
  })

  return {
    data,
    login: mutate,
    isErrorLogin: isError,
  }
}
