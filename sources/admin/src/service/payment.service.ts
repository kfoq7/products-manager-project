import { client } from '@/lib/axios'
import { Payment } from '@/types/payment'

export const getAllPayment = async (): Promise<Payment[]> => {
  return client.get('/payment').then(response => response.data)
}

export const getPaymentById = async (paymentId: number): Promise<Payment> => {
  return client.get(`/payment/${paymentId}`).then(response => response.data)
}
