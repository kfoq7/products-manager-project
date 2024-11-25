import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm'
import { OrderItem } from '../entities/order-item.entity'
import { Product } from '../entities/product.entity'

@EventSubscriber()
export class OrderItemSubscriber
  implements EntitySubscriberInterface<OrderItem>
{
  listenTo() {
    return OrderItem
  }

  async afterInsert(event: InsertEvent<OrderItem>): Promise<void> {
    console.log(event.entity)

    const orderItem = event.entity

    const productRepository = event.manager.getRepository(Product)

    const productToUpdate = await productRepository.findOne({
      where: {
        id: orderItem.product.id,
      },
    })

    if (!productToUpdate) return

    const updatedStock = productToUpdate.stock - orderItem.quantity

    productRepository.merge(productToUpdate, {
      stock: updatedStock,
    })

    await productRepository.save(productToUpdate)
  }
}
