import { Type } from 'class-transformer'
import { IsArray, ValidateNested } from 'class-validator'
import { CreatePaymentDetailDto } from './create-payment-detail.dto'

export class CreatePaymentDto {
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => CreatePaymentDetailDto)
  paymentDetails: CreatePaymentDetailDto[]
}
