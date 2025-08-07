import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingPassenger } from './entities/booking-passenger.entity';
import { CreateBookingPassengerDto } from './dto/create-booking-passenger.dto';
import { UpdateBookingPassengerDto } from './dto/update-booking-passenger.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class BookingPassengerService {
  constructor(
    @InjectRepository(BookingPassenger)
    private readonly bookingPassengerRepository: Repository<BookingPassenger>,
  ) {}

  async create(
    createBookingPassengerDto: CreateBookingPassengerDto,
  ): Promise<BookingPassenger> {
    const bookingPassenger = this.bookingPassengerRepository.create(
      createBookingPassengerDto,
    );
    return this.bookingPassengerRepository.save(bookingPassenger);
  }

  async findAll(): Promise<BookingPassenger[]> {
    return this.bookingPassengerRepository.find({
      relations: ['booking'],
    });
  }

  async findOne(id: number): Promise<BookingPassenger> {
    const bookingPassenger = await this.bookingPassengerRepository.findOne({
      where: { id },
      relations: ['booking'],
    });
    if (!bookingPassenger) {
      throw new NotFoundException('Booking passenger not found');
    }
    return bookingPassenger;
  }

  async update(
    id: number,
    updateBookingPassengerDto: UpdateBookingPassengerDto,
  ): Promise<BookingPassenger> {
    const bookingPassenger = await this.findOne(id);
    Object.assign(bookingPassenger, updateBookingPassengerDto);
    return this.bookingPassengerRepository.save(bookingPassenger);
  }

  async remove(id: number): Promise<void> {
    const bookingPassenger = await this.findOne(id);
    await this.bookingPassengerRepository.remove(bookingPassenger);
  }
}
