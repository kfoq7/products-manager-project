import { 
  Column, 
  CreateDateColumn, 
  ManyToMany, 
  PrimaryGeneratedColumn, 
  Relation, 
  UpdateDateColumn 
} from "typeorm"
import { User } from "./user.entity"

export class Role {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  description: string

  @ManyToMany(() => User, user => user.roles)
  users: Relation<User[]>

  @Column({ nullable: false, default: true })
  isActive: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}