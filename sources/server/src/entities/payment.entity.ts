import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm'
import { User } from './user.entity'
import { PaymentDetail } from './payment-detail.entity'
import { PaymentMethod } from './payment-method.entity'

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number

  @ManyToOne(() => User, user => user.payments)
  @JoinColumn()
  user: Relation<User>

  @ManyToOne(() => PaymentMethod)
  @JoinColumn()
  paymentMethod: Relation<PaymentMethod>

  @OneToMany(() => PaymentDetail, paymentDetail => paymentDetail.payment, {
    cascade: true,
  })
  paymetDetail: Relation<PaymentDetail[]>

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
