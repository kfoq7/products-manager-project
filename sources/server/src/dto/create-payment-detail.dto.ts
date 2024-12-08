import { Type } from 'class-transformer'
import { IsNumber, IsPositive } from 'class-validator'

export class CreatePaymentDetailDto {
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
  totalPrice: number
}
