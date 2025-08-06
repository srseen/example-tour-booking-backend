import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { BookingPassenger } from '../booking-passenger/entities/booking-passenger.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, BookingPassenger])],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [TypeOrmModule, BookingService],
})
export class BookingModule {}
