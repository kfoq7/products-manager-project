import { client } from '@/lib/axios'
import { Product } from '@/types/product'

export const getAllProducts = async () => {
  return client.get('/product').then(response => response.data)
}

export const getProductById = async (productId: number) => {
  return client.get(`/product/${productId}`).then(response => response.data)
}

export const createProduct = async (product: Product) => {
  return client.post('/product', product).then(response => response.data)
}
