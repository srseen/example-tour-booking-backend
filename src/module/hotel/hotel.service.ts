import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from './entities/hotel.entity';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { FilterHotelDto } from './dto/filter-hotel.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotel)
    private readonly hotelRepository: Repository<Hotel>,
  ) {}

  async create(createHotelDto: CreateHotelDto): Promise<Hotel> {
    const hotel = this.hotelRepository.create(createHotelDto);
    return this.hotelRepository.save(hotel);
  }

  async findAll(filterDto?: FilterHotelDto) {
    const {
      search,
      city,
      country,
      minRating,
      page = 1,
      limit = 10,
    } = filterDto || {};

    const queryBuilder = this.hotelRepository.createQueryBuilder('hotel');

    if (search) {
      queryBuilder.where(
        'hotel.name ILIKE :search OR hotel.address ILIKE :search',
        { search: `%${search}%` },
      );
    }

    if (city) {
      queryBuilder.andWhere('hotel.city ILIKE :city', {
        city: `%${city}%`,
      });
    }

    if (country) {
      queryBuilder.andWhere('hotel.country ILIKE :country', {
        country: `%${country}%`,
      });
    }

    if (minRating) {
      queryBuilder.andWhere('hotel.rating >= :minRating', { minRating });
    }

    const [hotels, total] = await queryBuilder
      .orderBy('hotel.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data: hotels,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Hotel> {
    const hotel = await this.hotelRepository.findOne({
      where: { id },
      relations: ['rooms', 'bookings'],
    });
    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }
    return hotel;
  }

  async update(id: number, updateHotelDto: UpdateHotelDto): Promise<Hotel> {
    const hotel = await this.findOne(id);
    Object.assign(hotel, updateHotelDto);
    return this.hotelRepository.save(hotel);
  }

  async remove(id: number): Promise<void> {
    const hotel = await this.findOne(id);
    await this.hotelRepository.remove(hotel);
  }
}
