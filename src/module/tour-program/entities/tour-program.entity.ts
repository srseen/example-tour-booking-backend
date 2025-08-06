// src/programs/tour-program.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Booking } from '../../booking/entities/booking.entity';

@Entity('tour_programs')
export class TourProgram {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ nullable: true })
  duration: number; // in hours

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  adultPrice: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  childPrice: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  infantPrice: number;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  maxCapacity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Booking, (booking) => booking.program)
  bookings: Booking[];
}
