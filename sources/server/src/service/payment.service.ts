import { CreatePaymentDto } from 'src/dto/create-payment.dto'
import { PaymentRepository } from '../repositories/payment.repository'

export class PaymentService {
  private readonly paymentRepository: PaymentRepository

  constructor() {
    this.paymentRepository = new PaymentRepository()
  }

  createPayment(data: CreatePaymentDto) {
    return this.paymentRepository.create(data)
  }
}
