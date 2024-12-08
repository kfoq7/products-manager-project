import { PaymentMethodRepository } from '../repositories/payment-method.respository'
import { CreatePaymentMethodDto } from '../dto/create-payment-method.dto'

export class PaymentMethodService {
  private readonly paymentMethodRepository: PaymentMethodRepository

  constructor() {
    this.paymentMethodRepository = new PaymentMethodRepository()
  }

  getAllMethodPayment() {
    return this.paymentMethodRepository.findAll()
  }

  createPaymentMethod(data: CreatePaymentMethodDto) {
    return this.paymentMethodRepository.create(data)
  }
}
