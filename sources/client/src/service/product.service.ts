import { client } from '@/lib/axios'
import { Product } from '@/types/product'

export const getAllProducts = async (): Promise<Product[]> => {
  return client.get('/product').then(response => response.data)
}
