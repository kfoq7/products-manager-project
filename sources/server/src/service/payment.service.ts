import { CreatePaymentDto } from 'src/dto/create-payment.dto'
import { PaymentRepository } from '../repositories/payment.repository'

export class PaymentService {
  private readonly paymentRepository: PaymentRepository

  constructor() {
    this.paymentRepository = new PaymentRepository()
  }

  findAllPayments() {
    return this.paymentRepository.findAll()
  }

  async findPaymentById(paymentId: number) {
    const payment = await this.paymentRepository.findById(paymentId)
    console.log(payment)
    if (!payment) {
      throw new Error('Payment not found')
    }

    return payment
  }

  createPayment(data: CreatePaymentDto) {
    return this.paymentRepository.create(data)
  }
}
