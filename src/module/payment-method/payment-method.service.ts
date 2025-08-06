import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentMethod } from './entities/payment-method.entity';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { FilterPaymentMethodDto } from './dto/filter-payment-method.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectRepository(PaymentMethod)
    private readonly paymentMethodRepository: Repository<PaymentMethod>,
  ) {}

  async create(createPaymentMethodDto: CreatePaymentMethodDto): Promise<PaymentMethod> {
    // Check if name already exists
    const existingPaymentMethod = await this.paymentMethodRepository.findOne({
      where: { name: createPaymentMethodDto.name },
    });
    if (existingPaymentMethod) {
      throw new ConflictException('Payment method name already exists');
    }

    const paymentMethod = this.paymentMethodRepository.create(createPaymentMethodDto);
    return this.paymentMethodRepository.save(paymentMethod);
  }

  async findAll(filterDto?: FilterPaymentMethodDto) {
    const { search, isActive, page = 1, limit = 10 } = filterDto || {};

    const queryBuilder = this.paymentMethodRepository.createQueryBuilder('paymentMethod');

    if (search) {
      queryBuilder.where(
        'paymentMethod.name ILIKE :search OR paymentMethod.displayName ILIKE :search',
        { search: `%${search}%` },
      );
    }

    if (isActive !== undefined) {
      queryBuilder.andWhere('paymentMethod.isActive = :isActive', { isActive });
    }

    const [paymentMethods, total] = await queryBuilder
      .orderBy('paymentMethod.name', 'ASC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data: paymentMethods,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<PaymentMethod> {
    const paymentMethod = await this.paymentMethodRepository.findOne({
      where: { id },
      relations: ['bookings'],
    });
    if (!paymentMethod) {
      throw new NotFoundException('Payment method not found');
    }
    return paymentMethod;
  }

  async update(
    id: number,
    updatePaymentMethodDto: UpdatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    const paymentMethod = await this.findOne(id);

    // Check if name already exists (if being updated)
    if (updatePaymentMethodDto.name && updatePaymentMethodDto.name !== paymentMethod.name) {
      const existingPaymentMethod = await this.paymentMethodRepository.findOne({
        where: { name: updatePaymentMethodDto.name },
      });
      if (existingPaymentMethod) {
        throw new ConflictException('Payment method name already exists');
      }
    }

    Object.assign(paymentMethod, updatePaymentMethodDto);
    return this.paymentMethodRepository.save(paymentMethod);
  }

  async remove(id: number): Promise<void> {
    const paymentMethod = await this.findOne(id);
    await this.paymentMethodRepository.remove(paymentMethod);
  }
}
