import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm'
import { Order } from './order.entity'
import { Product } from './product.entity'

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Order, order => order.items)
  @JoinColumn()
  order: Relation<Order>

  @ManyToOne(() => Product)
  @JoinColumn()
  product: Relation<Product>

  @Column()
  quantity: number

  @Column('decimal', { precision: 10, scale: 2 })
  price: number
}
