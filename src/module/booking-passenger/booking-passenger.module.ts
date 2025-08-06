import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingPassengerService } from './booking-passenger.service';
import { BookingPassengerController } from './booking-passenger.controller';
import { BookingPassenger } from './entities/booking-passenger.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookingPassenger])],
  controllers: [BookingPassengerController],
  providers: [BookingPassengerService],
  exports: [TypeOrmModule, BookingPassengerService],
})
export class BookingPassengerModule {}
