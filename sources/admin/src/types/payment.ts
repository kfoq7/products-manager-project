export interface PaymentDetail {
  id: number
  quantity: number
  totalPrice: string
  product: {
    id: number
    name: string
  }
}

export interface Payment {
  id: number
  totalPrice: string
  createdAt: string
  paymentMethod: {
    id: number
    name: string
    description: string | null
  }
  user: {
    id: number
    email: string
  }
  paymetDetail: PaymentDetail[]
}
