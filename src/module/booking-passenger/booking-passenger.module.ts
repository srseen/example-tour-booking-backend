import { Module } from '@nestjs/common';
import { BookingPassengerService } from './booking-passenger.service';
import { BookingPassengerController } from './booking-passenger.controller';

@Module({
  controllers: [BookingPassengerController],
  providers: [BookingPassengerService],
})
export class BookingPassengerModule {}
