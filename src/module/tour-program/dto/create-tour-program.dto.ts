import {
  IsString,
  IsOptional,
  IsNumber,
  IsInt,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTourProgramDto {
  @ApiProperty({ example: 'City Tour' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({
    example: 'A tour around the city highlights.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 4, required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  duration?: number; // in hours

  @ApiProperty({ example: 50, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  adultPrice?: number;

  @ApiProperty({ example: 25, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  childPrice?: number;

  @ApiProperty({ example: 0, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  infantPrice?: number;

  @ApiProperty({ example: 'Anytown', required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ example: 'Sightseeing', required: false })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ example: 20, required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  maxCapacity?: number;
}
