import { useQuery } from '@tanstack/react-query'
import { getAllCategories } from '@/service/category.service'

export function useListCategory() {
  const { data, isLoading } = useQuery({
    queryKey: ['list-category'],
    queryFn: getAllCategories,
  })

  return {
    categories: data ?? [],
    isLoadingCategories: isLoading,
  }
}
