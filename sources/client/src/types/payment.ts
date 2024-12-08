import { Product } from './product'

export interface PaymentMethod {
  id: number
  name: string
}

export interface PaymentDetail {
  quantity: number
  product: Product
  totalPrice: number
}

export interface Payment {
  totalPrice: number
  paymentDetails: PaymentDetail[]
}
