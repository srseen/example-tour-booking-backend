import { IsString, IsOptional, IsBoolean, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentMethodDto {
  @ApiProperty({ example: 'credit_card' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: 'Credit Card' })
  @IsString()
  @MinLength(2)
  displayName: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}
