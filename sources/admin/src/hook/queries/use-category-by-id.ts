import { getCategoryById } from '@/service/category.service'
import { useQuery } from '@tanstack/react-query'

export function useCategoryById(categoryId?: string | number | null) {
  const { data } = useQuery({
    queryKey: ['category-id', categoryId],
    queryFn: () => getCategoryById(Number(categoryId)),
  })

  return {
    category: data,
  }
}
