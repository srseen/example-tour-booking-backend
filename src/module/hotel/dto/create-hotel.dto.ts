import {
  IsString,
  IsOptional,
  IsNumber,
  Min,
  Max,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHotelDto {
  @ApiProperty({ example: 'The Grand Hotel' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: '123 Main St', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ example: 'Anytown', required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ example: 'USA', required: false })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({ example: 4.5, required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating?: number;

  @ApiProperty({ example: '555-1234', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'info@grandhotel.com', required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({
    example: 'A luxurious hotel with stunning views.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
