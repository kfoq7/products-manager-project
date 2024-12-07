import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreatePaymentMethodDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string
}
