// bookings/dto/create-booking.dto.ts
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsInt()
  customerId: number;

  @IsInt()
  programId: number;

  @IsInt()
  agencyId: number;

  @IsDateString()
  tourDate: string;

  @IsInt()
  adult: number;

  @IsInt()
  child: number;

  @IsInt()
  infant: number;

  @IsOptional()
  @IsString()
  remarks?: string;
}
