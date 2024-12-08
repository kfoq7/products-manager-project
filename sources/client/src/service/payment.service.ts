import { client } from '@/lib/axios'
import { Cart } from '@/stores/cart'
import { Payment, PaymentMethod } from '@/types/payment'

export const createPayment = async (data: Cart): Promise<Payment> => {
  return client.post('/payment', data).then(response => response.data)
}

export const getAllPaymentMethod = async (): Promise<PaymentMethod[]> => {
  return client.get('/payment-method').then(response => response.data)
}
