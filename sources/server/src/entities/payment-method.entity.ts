import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class PaymentMethod {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ length: 100 })
  name: string

  @Column({ type: 'text', nullable: true })
  description?: string
}
