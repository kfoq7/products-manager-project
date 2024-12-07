import { client } from '@/lib/axios'
import { Cart } from '@/stores/cart'
import { PaymentMethod } from '@/types/payment'

export const createPaymentMethod = async (data: Cart) => {
  return client.post('/order', data).then(response => response.data)
}

export const getAllPaymentMethod = async (): Promise<PaymentMethod[]> => {
  return client.get('/payment-method').then(response => response.data)
}
