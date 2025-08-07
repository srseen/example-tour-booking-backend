import { IsInt, Min, IsOptional } from 'class-validator';

export class UpdateBookingPassengerDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  adults?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  children?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  infants?: number;
}
