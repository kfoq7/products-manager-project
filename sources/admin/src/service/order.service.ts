import { client } from '@/lib/axios'
import { CreateOrder, Order } from '@/types/order'

export const getAllOrders = async (): Promise<Order[]> => {
  return client.get('/order').then(response => response.data)
}

export const getOrderById = async (orderId: string): Promise<Order> => {
  return client.get(`/order/${orderId}`).then(response => response.data)
}

export const createOrder = async (data: CreateOrder) => {
  return client.post('/order', data).then(response => response.data)
}
