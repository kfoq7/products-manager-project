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
import { OrderItem } from './order-item.entity'

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, user => user.orders)
  @JoinColumn()
  user: Relation<User>

  @OneToMany(() => OrderItem, orderItem => orderItem.order, { cascade: true })
  items: Relation<OrderItem[]>

  @Column('decimal', { precision: 10, scale: 2 })
  total: number

  @Column('text', { nullable: true })
  description: string

  @Column({ default: 'pending' })
  status: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
