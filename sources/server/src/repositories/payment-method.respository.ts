import { Repository } from 'typeorm'
import { AppDataSource } from '../config/database.config'
import { PaymentMethod } from '../entities/payment-method.entity'
import { CreatePaymentMethodDto } from 'src/dto/create-payment-method.dto'

export class PaymentMethodRepository {
  private readonly paymentMethodRepository: Repository<PaymentMethod>

  constructor() {
    this.paymentMethodRepository = AppDataSource.getRepository(PaymentMethod)
  }

  findAll() {
    return this.paymentMethodRepository.find()
  }

  create(data: CreatePaymentMethodDto) {
    const paymentMethod = this.paymentMethodRepository.create(data)
    return this.paymentMethodRepository.save(paymentMethod)
  }
}
