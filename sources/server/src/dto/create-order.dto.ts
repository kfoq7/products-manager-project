import { Type } from 'class-transformer'
import { CreateOrderItemDto } from './create-order-item.dto'
import { IsArray, ValidateNested } from 'class-validator'

export class CreateOrderDto {
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[]
}
