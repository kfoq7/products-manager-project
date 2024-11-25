import { Type } from 'class-transformer'
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator'

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string

  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  price: number

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  categoryId: number
}
