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
import { Order } from './order.entity'
import { Role } from './role.entity'
import { Payment } from './payment.entity'

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

  @ManyToOne(() => Role, role => role.users)
  @JoinColumn()
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

  @OneToMany(() => Payment, payment => payment.user)
  payments: Relation<Payment[]>

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
