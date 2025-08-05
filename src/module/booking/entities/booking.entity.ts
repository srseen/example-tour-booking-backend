// src/bookings/booking.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  CreateDateColumn,
} from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity';
import { Hotel } from '../../hotel/entities/hotel.entity';
import { Room } from '../../room/entities/room.entity';
import { TourProgram } from '../../tour-program/entities/tour-program.entity';
import { User } from '../../users/entities/user.entity';
import { Contact } from '../../contact/entities/contact.entity';
import { BookingPassenger } from '../../booking-passenger/entities/booking-passenger.entity';
import { PaymentMethod } from '../../payment-method/entities/payment-method.entity';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  bookingNo: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  issueDate: Date;

  @Column()
  tourDate: Date;

  @Column()
  time: string;

  @Column()
  duringTime: string;

  @Column()
  pickUpTime: string;

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number;

  @Column('decimal', { precision: 10, scale: 2 })
  cost: number;

  @Column('decimal', { precision: 10, scale: 2 })
  deposit: number;

  @Column('decimal', { precision: 10, scale: 2 })
  cashOnTour: number;

  @Column({ nullable: true })
  remarks: string;

  @ManyToOne(() => Customer, (customer) => customer.bookings)
  customer: Customer;

  @ManyToOne(() => Hotel, (hotel) => hotel.bookings)
  hotel: Hotel;

  @ManyToOne(() => Room, (room) => room.bookings)
  room: Room;

  @ManyToOne(() => TourProgram, (program) => program.bookings)
  program: TourProgram;

  @ManyToOne(() => User, (user) => user.bookingsBooked)
  bookedBy: User;

  @ManyToOne(() => User, (user) => user.bookingsConfirmed)
  confirmedBy: User;

  @ManyToOne(() => Contact, (contact) => contact.bookings)
  contactBooker: Contact;

  @ManyToOne(() => PaymentMethod, (pm) => pm.bookings)
  paymentMethod: PaymentMethod;

  @OneToOne(() => BookingPassenger, (passenger) => passenger.booking, {
    cascade: true,
  })
  passenger: BookingPassenger;
}
