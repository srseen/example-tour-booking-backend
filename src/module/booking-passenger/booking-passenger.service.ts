import { Injectable } from '@nestjs/common';
import { CreateBookingPassengerDto } from './dto/create-booking-passenger.dto';
import { UpdateBookingPassengerDto } from './dto/update-booking-passenger.dto';

@Injectable()
export class BookingPassengerService {
  create(createBookingPassengerDto: CreateBookingPassengerDto) {
    return 'This action adds a new bookingPassenger';
  }

  findAll() {
    return `This action returns all bookingPassenger`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookingPassenger`;
  }

  update(id: number, updateBookingPassengerDto: UpdateBookingPassengerDto) {
    return `This action updates a #${id} bookingPassenger`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookingPassenger`;
  }
}
