import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm'
import { Payment } from './payment.entity'
import { Product } from './product.entity'

@Entity()
export class PaymentDetail {
  @PrimaryGeneratedColumn('increment')
  id: number

  @ManyToOne(() => Payment, payment => payment.paymetDetail)
  @JoinColumn()
  payment: Relation<Payment>

  @ManyToOne(() => Product)
  @JoinColumn()
  product: Relation<Product>

  @Column()
  quantity: number

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number
}
