import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm'
import { Order } from './order.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ default: 'customer' })
  role: string

  @Column({
    type: 'enum',
    enum: ['DNI', 'passport'],
    nullable: true,
  })
  documentType: string

  @Column({ nullable: true })
  documentNumber: number

  @Column({ nullable: true })
  ruc: number

  @Column({ nullable: false, default: true })
  isActive: boolean

  @OneToMany(() => Order, order => order.user)
  orders: Relation<Order[]>

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
