import { IsString, IsOptional, IsInt, IsNumber, Min, MinLength } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @MinLength(1)
  roomNumber: string;

  @IsInt()
  @Min(1)
  hotelId: number;

  @IsOptional()
  @IsString()
  roomType?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  capacity?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  pricePerNight?: number;

  @IsOptional()
  @IsString()
  description?: string;
}
