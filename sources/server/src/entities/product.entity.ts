import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm'
import { Category } from './category.entity'

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column('text', { nullable: true })
  description: string

  @Column('decimal', {
    precision: 10,
    scale: 2,
    transformer: {
      to(value) {
        return value
      },
      from(value) {
        return parseFloat(value)
      },
    },
  })
  price: number

  @Column({ default: true })
  inStock: boolean

  @Column()
  stock: number

  @Column({ default: true })
  status: boolean

  @ManyToOne(() => Category, category => category.products, {
    cascade: ['insert', 'recover'],
  })
  @JoinColumn()
  category: Relation<Category>

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
