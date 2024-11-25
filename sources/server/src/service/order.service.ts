import { CreateOrderDto } from 'src/dto/create-order.dto'
import { OrderRepository } from '../repositories/order.repository'

export class OrderService {
  private readonly orderRepository: OrderRepository

  constructor() {
    this.orderRepository = new OrderRepository()
  }

  getAllOrders() {
    return this.orderRepository.findAll()
  }

  getOrderById(orderId: number) {
    return this.orderRepository.findById(orderId)
  }

  createOrder(orderDto: CreateOrderDto) {
    return this.orderRepository.create(orderDto)
  }
}
