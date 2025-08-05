import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  IsNumber,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateBookingPassengerDto } from '../../booking-passenger/dto/update-booking-passenger.dto';

export class UpdateBookingDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  customerId?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  programId?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  hotelId?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  roomId?: number;

  @IsOptional()
  @IsDateString()
  tourDate?: string;

  @IsOptional()
  @IsString()
  time?: string;

  @IsOptional()
  @IsString()
  duringTime?: string;

  @IsOptional()
  @IsString()
  pickUpTime?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateBookingPassengerDto)
  passenger?: UpdateBookingPassengerDto;

  @IsOptional()
  @IsNumber()
  @Min(0)
  totalPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  cost?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  deposit?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  cashOnTour?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  paymentMethodId?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  contactBookerId?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  confirmedById?: number;

  @IsOptional()
  @IsString()
  remarks?: string;
}
