import { IsInt, Min } from 'class-validator';

export class CreateBookingPassengerDto {
  @IsInt()
  @Min(0)
  adults: number;

  @IsInt()
  @Min(0)
  children: number;

  @IsInt()
  @Min(0)
  infants: number;
}