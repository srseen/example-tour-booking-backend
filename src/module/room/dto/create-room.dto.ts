import {
  IsString,
  IsOptional,
  IsInt,
  IsNumber,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
  @ApiProperty({ example: '101' })
  @IsString()
  @MinLength(1)
  roomNumber: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  hotelId: number;

  @ApiProperty({ example: 'Standard', required: false })
  @IsOptional()
  @IsString()
  roomType?: string;

  @ApiProperty({ example: 2, required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  capacity?: number;

  @ApiProperty({ example: 100, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  pricePerNight?: number;

  @ApiProperty({ example: 'A cozy room with a nice view.', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
