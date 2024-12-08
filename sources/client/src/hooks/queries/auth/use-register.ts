import { register } from '@/service/auth.service'
import { useMutation } from '@tanstack/react-query'

export function useRegister() {
  const { data, mutate, isError } = useMutation({
    mutationFn: register,
  })

  return {
    user: data,
    register: mutate,
    isErrorRegister: isError,
  }
}
