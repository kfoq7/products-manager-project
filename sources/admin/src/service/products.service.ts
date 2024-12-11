import { client } from '@/lib/axios'
import { Product } from '@/types/product'

export const getAllProducts = async (): Promise<Product[]> => {
  return client.get('/product').then(response => response.data)
}

export const getProductById = async (productId: number): Promise<Product> => {
  return client.get(`/product/${productId}`).then(response => response.data)
}

export const createProduct = async (product: Partial<Product>) => {
  return client.post('/product', product).then(response => response.data)
}

export const updateProduct = async (product: Partial<Product>) => {
  return client
    .put(`/product/${product.id}`, product)
    .then(response => response.data)
}
