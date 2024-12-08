import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm'
import { PaymentDetail } from '../entities/payment-detail.entity'
import { Product } from '../entities/product.entity'

@EventSubscriber()
export class PaymentDetailSubscriber
  implements EntitySubscriberInterface<PaymentDetail>
{
  listenTo() {
    return PaymentDetail
  }

  async afterInsert(event: InsertEvent<PaymentDetail>): Promise<void> {
    const paymentDetail = event.entity

    const productRepository = event.manager.getRepository(Product)

    const productToUpdate = await productRepository.findOne({
      where: {
        id: paymentDetail.product.id,
      },
    })

    if (!productToUpdate) return

    const updatedStock = productToUpdate.stock - paymentDetail.quantity

    productRepository.merge(productToUpdate, {
      stock: updatedStock,
    })

    await productRepository.save(productToUpdate)
  }
}
