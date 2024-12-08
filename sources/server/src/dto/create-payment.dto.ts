import { Type } from 'class-transformer'
import { IsArray, IsNumber, IsPositive, ValidateNested } from 'class-validator'
import { CreatePaymentDetailDto } from './create-payment-detail.dto'

export class CreatePaymentDto {
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  userId: number

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  paymentMethodId: number

  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  totalPrice: number

  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => CreatePaymentDetailDto)
  paymentDetails: CreatePaymentDetailDto[]
}
