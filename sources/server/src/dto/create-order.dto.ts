import { Type } from 'class-transformer'
import { CreateOrderItemDto } from './create-order-item.dto'
import { IsArray, IsNumber, IsPositive, ValidateNested } from 'class-validator'

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  userId: number

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  total: number

  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[]
}
