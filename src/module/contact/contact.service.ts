import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { FilterContactDto } from './dto/filter-contact.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    // Check if email already exists (if provided)
    if (createContactDto.email) {
      const existingContact = await this.contactRepository.findOne({
        where: { email: createContactDto.email },
      });
      if (existingContact) {
        throw new ConflictException('Email already exists');
      }
    }

    const contact = this.contactRepository.create(createContactDto);
    return this.contactRepository.save(contact);
  }

  async findAll(filterDto?: FilterContactDto) {
    const { search, company, page = 1, limit = 10 } = filterDto || {};

    const queryBuilder = this.contactRepository.createQueryBuilder('contact');

    if (search) {
      queryBuilder.where(
        'contact.name ILIKE :search OR contact.email ILIKE :search OR contact.phone ILIKE :search',
        { search: `%${search}%` },
      );
    }

    if (company) {
      queryBuilder.andWhere('contact.company ILIKE :company', {
        company: `%${company}%`,
      });
    }

    const [contacts, total] = await queryBuilder
      .orderBy('contact.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data: contacts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Contact> {
    const contact = await this.contactRepository.findOne({
      where: { id },
      relations: ['bookings'],
    });
    if (!contact) {
      throw new NotFoundException('Contact not found');
    }
    return contact;
  }

  async update(
    id: number,
    updateContactDto: UpdateContactDto,
  ): Promise<Contact> {
    const contact = await this.findOne(id);

    // Check if email already exists (if being updated)
    if (updateContactDto.email && updateContactDto.email !== contact.email) {
      const existingContact = await this.contactRepository.findOne({
        where: { email: updateContactDto.email },
      });
      if (existingContact) {
        throw new ConflictException('Email already exists');
      }
    }

    Object.assign(contact, updateContactDto);
    return this.contactRepository.save(contact);
  }

  async remove(id: number): Promise<void> {
    const contact = await this.findOne(id);
    await this.contactRepository.remove(contact);
  }
}
