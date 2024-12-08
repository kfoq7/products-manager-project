import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm'
import { User } from './user.entity'
import { PaymentDetail } from './PaymentDetail.entity'

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('increment')
  id: number

  @ManyToOne(() => User, user => user.payments)
  @JoinColumn()
  user: Relation<User>

  @OneToMany(() => PaymentDetail, paymentDetail => paymentDetail.payment, {
    cascade: true,
  })
  paymetDetail: Relation<PaymentDetail[]>
}
