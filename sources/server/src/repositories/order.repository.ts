import { Repository } from 'typeorm'
import { Order } from '../entities/order.entity'
import { AppDataSource } from '../config/database.config'
import { CreateOrderDto } from 'src/dto/create-order.dto'

export class OrderRepository {
  private readonly orderRepository: Repository<Order>

  constructor() {
    this.orderRepository = AppDataSource.getRepository(Order)
  }

  findAll() {
    return this.orderRepository.find({
      relations: {
        items: {
          product: true,
        },
      },
    })
  }

  findById(orderId: number) {
    return this.orderRepository.findOne({
      where: {
        id: orderId,
      },
      relations: {
        items: {
          product: true,
        },
      },
    })
  }

  create(orderDto: CreateOrderDto) {
    const { items, userId, ...restOrderDto } = orderDto

    const itemsMapped = items.map(({ productId, ...restItem }) => ({
      ...restItem,
      product: {
        id: productId,
      },
    }))

    const order = this.orderRepository.create({
      ...restOrderDto,
      user: {
        id: userId,
      },
      items: itemsMapped,
    })

    return this.orderRepository.save(order)
  }
}
