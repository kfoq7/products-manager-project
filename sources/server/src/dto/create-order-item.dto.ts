import { Type } from 'class-transformer'
import { IsNumber, IsPositive } from 'class-validator'

export class CreateOrderItemDto {
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  productId: number

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  quantity: number

  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  price: number
}
