import { client } from '@/lib/axios'
import { Category } from '@/types/product'

export const getAllCategories = async (): Promise<Category[]> => {
  return client.get('/category').then(response => response.data)
}
