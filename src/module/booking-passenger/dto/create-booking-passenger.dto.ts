import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingPassengerDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(0)
  adults: number;

  @ApiProperty({ example: 0 })
  @IsInt()
  @Min(0)
  children: number;

  @ApiProperty({ example: 0 })
  @IsInt()
  @Min(0)
  infants: number;
}
