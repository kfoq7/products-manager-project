import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm'
import { Product } from './product.entity'

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ nullable: true })
  description: string

  @OneToMany(() => Product, product => product.category)
  products: Relation<Product[]>

  @CreateDateColumn()
  createdAt: number
}
