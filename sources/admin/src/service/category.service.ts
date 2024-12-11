import { client } from '@/lib/axios'
import { Category } from '@/types/product'

export const getAllCategories = async (): Promise<Category[]> => {
  return client.get('/category').then(response => response.data)
}

export const getCategoryById = async (
  categoryId: number,
): Promise<Category> => {
  return client.get(`/category/${categoryId}`).then(response => response.data)
}

export const createCategory = async (data: {
  name: string
  description: string
}) => {
  return client.post('/category', data).then(response => response.data)
}

export const updateCategory = async (category: Category) => {
  return client
    .put(`/category/${category.id}`, category)
    .then(response => response.data)
}
