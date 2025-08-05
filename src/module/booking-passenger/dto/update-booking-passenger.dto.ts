import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingPassengerDto } from './create-booking-passenger.dto';

export class UpdateBookingPassengerDto extends PartialType(
  CreateBookingPassengerDto,
) {}
