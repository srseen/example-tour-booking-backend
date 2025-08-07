import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TourProgram } from './entities/tour-program.entity';
import { CreateTourProgramDto } from './dto/create-tour-program.dto';
import { UpdateTourProgramDto } from './dto/update-tour-program.dto';
import { FilterTourProgramDto } from './dto/filter-tour-program.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class TourProgramService {
  constructor(
    @InjectRepository(TourProgram)
    private readonly tourProgramRepository: Repository<TourProgram>,
  ) {}

  async create(
    createTourProgramDto: CreateTourProgramDto,
  ): Promise<TourProgram> {
    const tourProgram = this.tourProgramRepository.create(createTourProgramDto);
    return this.tourProgramRepository.save(tourProgram);
  }

  async findAll(filterDto?: FilterTourProgramDto) {
    const {
      search,
      location,
      category,
      maxPrice,
      minDuration,
      maxDuration,
      page = 1,
      limit = 10,
    } = filterDto || {};

    const queryBuilder =
      this.tourProgramRepository.createQueryBuilder('program');

    if (search) {
      queryBuilder.where(
        'program.name ILIKE :search OR program.description ILIKE :search',
        { search: `%${search}%` },
      );
    }

    if (location) {
      queryBuilder.andWhere('program.location ILIKE :location', {
        location: `%${location}%`,
      });
    }

    if (category) {
      queryBuilder.andWhere('program.category ILIKE :category', {
        category: `%${category}%`,
      });
    }

    if (maxPrice) {
      queryBuilder.andWhere('program.adultPrice <= :maxPrice', { maxPrice });
    }

    if (minDuration) {
      queryBuilder.andWhere('program.duration >= :minDuration', {
        minDuration,
      });
    }

    if (maxDuration) {
      queryBuilder.andWhere('program.duration <= :maxDuration', {
        maxDuration,
      });
    }

    const [programs, total] = await queryBuilder
      .orderBy('program.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data: programs,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<TourProgram> {
    const program = await this.tourProgramRepository.findOne({
      where: { id },
      relations: ['bookings'],
    });
    if (!program) {
      throw new NotFoundException('Tour program not found');
    }
    return program;
  }

  async update(
    id: number,
    updateTourProgramDto: UpdateTourProgramDto,
  ): Promise<TourProgram> {
    const program = await this.findOne(id);
    Object.assign(program, updateTourProgramDto);
    return this.tourProgramRepository.save(program);
  }

  async remove(id: number): Promise<void> {
    const program = await this.findOne(id);
    await this.tourProgramRepository.remove(program);
  }
}
