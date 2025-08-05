import { 
  IsDateString, 
  IsInt, 
  IsOptional, 
  IsString, 
  IsNumber, 
  Min, 
  ValidateNested 
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateBookingPassengerDto } from '../../booking-passenger/dto/create-booking-passenger.dto';

export class CreateBookingDto {
  @IsInt()
  @Min(1)
  customerId: number;

  @IsInt()
  @Min(1)
  programId: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  hotelId?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  roomId?: number;

  @IsDateString()
  tourDate: string;

  @IsOptional()
  @IsString()
  time?: string;

  @IsOptional()
  @IsString()
  duringTime?: string;

  @IsOptional()
  @IsString()
  pickUpTime?: string;

  @ValidateNested()
  @Type(() => CreateBookingPassengerDto)
  passenger: CreateBookingPassengerDto;

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
  bookedById?: number;

  @IsOptional()
  @IsString()
  remarks?: string;
}
