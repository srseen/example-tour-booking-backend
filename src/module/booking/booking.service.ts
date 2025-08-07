import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking, BookingStatus } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { FilterBookingDto } from './dto/filter-booking.dto';
import { UpdateBookingStatusDto } from './dto/booking-status.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { BookingPassenger } from '../booking-passenger/entities/booking-passenger.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(BookingPassenger)
    private readonly bookingPassengerRepository: Repository<BookingPassenger>,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const { passenger, ...bookingData } = createBookingDto;

    // Create booking passenger first
    const bookingPassenger = this.bookingPassengerRepository.create(passenger);
    const savedPassenger =
      await this.bookingPassengerRepository.save(bookingPassenger);

    // Create booking with passenger
    const booking = this.bookingRepository.create({
      ...bookingData,
      passenger: savedPassenger,
    });

    return this.bookingRepository.save(booking);
  }

  async findAll(filterDto?: FilterBookingDto) {
    const {
      search,
      customerId,
      programId,
      hotelId,
      tourDateFrom,
      tourDateTo,
      createdFrom,
      createdTo,
      minTotalPrice,
      maxTotalPrice,
      bookedById,
      confirmedById,
      page = 1,
      limit = 10,
    } = filterDto || {};

    const queryBuilder = this.bookingRepository
      .createQueryBuilder('booking')
      .leftJoinAndSelect('booking.customer', 'customer')
      .leftJoinAndSelect('booking.program', 'program')
      .leftJoinAndSelect('booking.hotel', 'hotel')
      .leftJoinAndSelect('booking.room', 'room')
      .leftJoinAndSelect('booking.bookedBy', 'bookedBy')
      .leftJoinAndSelect('booking.confirmedBy', 'confirmedBy')
      .leftJoinAndSelect('booking.contactBooker', 'contactBooker')
      .leftJoinAndSelect('booking.paymentMethod', 'paymentMethod')
      .leftJoinAndSelect('booking.passenger', 'passenger');

    if (search) {
      queryBuilder.where(
        'booking.bookingNo ILIKE :search OR customer.name ILIKE :search',
        { search: `%${search}%` },
      );
    }

    if (customerId) {
      queryBuilder.andWhere('booking.customerId = :customerId', { customerId });
    }

    if (programId) {
      queryBuilder.andWhere('booking.programId = :programId', { programId });
    }

    if (hotelId) {
      queryBuilder.andWhere('booking.hotelId = :hotelId', { hotelId });
    }

    if (tourDateFrom) {
      queryBuilder.andWhere('booking.tourDate >= :tourDateFrom', {
        tourDateFrom,
      });
    }

    if (tourDateTo) {
      queryBuilder.andWhere('booking.tourDate <= :tourDateTo', { tourDateTo });
    }

    if (createdFrom) {
      queryBuilder.andWhere('booking.createdAt >= :createdFrom', {
        createdFrom,
      });
    }

    if (createdTo) {
      queryBuilder.andWhere('booking.createdAt <= :createdTo', { createdTo });
    }

    if (minTotalPrice) {
      queryBuilder.andWhere('booking.totalPrice >= :minTotalPrice', {
        minTotalPrice,
      });
    }

    if (maxTotalPrice) {
      queryBuilder.andWhere('booking.totalPrice <= :maxTotalPrice', {
        maxTotalPrice,
      });
    }

    if (bookedById) {
      queryBuilder.andWhere('booking.bookedById = :bookedById', { bookedById });
    }

    if (confirmedById) {
      queryBuilder.andWhere('booking.confirmedById = :confirmedById', {
        confirmedById,
      });
    }

    const [bookings, total] = await queryBuilder
      .orderBy('booking.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data: bookings,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: [
        'customer',
        'program',
        'hotel',
        'room',
        'bookedBy',
        'confirmedBy',
        'contactBooker',
        'paymentMethod',
        'passenger',
      ],
    });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    return booking;
  }

  async update(
    id: number,
    updateBookingDto: UpdateBookingDto,
  ): Promise<Booking> {
    const booking = await this.findOne(id);
    const { passenger, ...bookingData } = updateBookingDto;

    // Update passenger if provided
    if (passenger && booking.passenger) {
      Object.assign(booking.passenger, passenger);
      await this.bookingPassengerRepository.save(booking.passenger);
    }

    // Update booking
    Object.assign(booking, bookingData);
    return this.bookingRepository.save(booking);
  }

  async updateStatus(
    id: number,
    updateStatusDto: UpdateBookingStatusDto,
  ): Promise<Booking> {
    const booking = await this.findOne(id);

    // Validate status transition
    if (
      booking.status === BookingStatus.CANCELLED &&
      updateStatusDto.status !== BookingStatus.CANCELLED
    ) {
      throw new BadRequestException(
        'Cannot change status of cancelled booking',
      );
    }

    booking.status = updateStatusDto.status;
    return this.bookingRepository.save(booking);
  }

  async remove(id: number): Promise<void> {
    const booking = await this.findOne(id);

    // Only allow deletion of pending bookings
    if (booking.status !== BookingStatus.PENDING) {
      throw new BadRequestException('Can only delete pending bookings');
    }

    await this.bookingRepository.remove(booking);
  }

  async getBookingStats() {
    const totalBookings = await this.bookingRepository.count();
    const pendingBookings = await this.bookingRepository.count({
      where: { status: BookingStatus.PENDING },
    });
    const confirmedBookings = await this.bookingRepository.count({
      where: { status: BookingStatus.CONFIRMED },
    });
    const completedBookings = await this.bookingRepository.count({
      where: { status: BookingStatus.COMPLETED },
    });
    const cancelledBookings = await this.bookingRepository.count({
      where: { status: BookingStatus.CANCELLED },
    });

    const totalRevenue = await this.bookingRepository
      .createQueryBuilder('booking')
      .select('SUM(booking.totalPrice)', 'total')
      .where('booking.status IN (:...statuses)', {
        statuses: [BookingStatus.CONFIRMED, BookingStatus.COMPLETED],
      })
      .getRawOne();

    return {
      totalBookings,
      pendingBookings,
      confirmedBookings,
      completedBookings,
      cancelledBookings,
      totalRevenue: parseFloat(totalRevenue.total) || 0,
    };
  }
}
