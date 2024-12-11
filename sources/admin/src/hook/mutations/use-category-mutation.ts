import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCategory } from '@/service/category.service'

export function useCategoryMutate() {
  const queryClient = useQueryClient()

  const { mutate, mutateAsync } = useMutation({
    mutationFn: (data: { name: string; description: string }) =>
      createCategory(data),
    onSuccess: () => {
      toast.success('Category creada correctamente')

      queryClient.invalidateQueries({
        queryKey: ['list-category'],
      })
    },
  })

  return {
    createCategory: mutate,
    createCategoryAsync: mutateAsync,
  }
}
