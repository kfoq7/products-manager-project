import { Repository } from 'typeorm'
import { AppDataSource } from '../config/database.config'
import { Payment } from '../entities/payment.entity'
import { CreatePaymentDto } from '../dto/create-payment.dto'

export class PaymentRepository {
  private readonly paymentRepository: Repository<Payment>

  constructor() {
    this.paymentRepository = AppDataSource.getRepository(Payment)
  }

  findAll() {
    return this.paymentRepository.find()
  }

  findById(paymentId: number) {
    return this.paymentRepository.findOne({
      where: {
        id: paymentId,
      },
    })
  }

  create(paymentDto: CreatePaymentDto) {
    const { paymentMethodId, paymentDetails, userId, ...restPaymentDto } =
      paymentDto

    const detailsMapped = paymentDetails.map(({ productId, ...restItem }) => ({
      ...restItem,
      product: {
        id: productId,
      },
    }))

    const payment = this.paymentRepository.create({
      ...restPaymentDto,
      user: {
        id: userId,
      },
      paymentMethod: {
        id: paymentMethodId,
      },
      paymetDetail: detailsMapped,
    })

    return this.paymentRepository.save(payment)
  }
}
