import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm'
import { Order } from './order.entity'
import { Role } from './role.entity'

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

  @ManyToMany(() => Role, role => role.users)
  roles: Relation<[Role]>

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
