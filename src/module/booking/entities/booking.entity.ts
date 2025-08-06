// src/bookings/booking.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity';
import { Hotel } from '../../hotel/entities/hotel.entity';
import { Room } from '../../room/entities/room.entity';
import { TourProgram } from '../../tour-program/entities/tour-program.entity';
import { User } from '../../users/entities/user.entity';
import { Contact } from '../../contact/entities/contact.entity';
import { BookingPassenger } from '../../booking-passenger/entities/booking-passenger.entity';
import { PaymentMethod } from '../../payment-method/entities/payment-method.entity';

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  bookingNo: string;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status: BookingStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'date' })
  issueDate: Date;

  @Column({ type: 'date' })
  tourDate: Date;

  @Column({ nullable: true })
  time: string;

  @Column({ nullable: true })
  duringTime: string;

  @Column({ nullable: true })
  pickUpTime: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  totalPrice: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  cost: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  deposit: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  cashOnTour: number;

  @Column({ nullable: true })
  remarks: string;

  // Foreign Keys
  @Column()
  customerId: number;

  @Column()
  programId: number;

  @Column({ nullable: true })
  hotelId: number;

  @Column({ nullable: true })
  roomId: number;

  @Column({ nullable: true })
  paymentMethodId: number;

  @Column({ nullable: true })
  contactBookerId: number;

  @Column({ nullable: true })
  bookedById: number;

  @Column({ nullable: true })
  confirmedById: number;

  // Relations
  @ManyToOne(() => Customer, (customer) => customer.bookings)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @ManyToOne(() => Hotel, (hotel) => hotel.bookings, { nullable: true })
  @JoinColumn({ name: 'hotelId' })
  hotel: Hotel;

  @ManyToOne(() => Room, (room) => room.bookings, { nullable: true })
  @JoinColumn({ name: 'roomId' })
  room: Room;

  @ManyToOne(() => TourProgram, (program) => program.bookings)
  @JoinColumn({ name: 'programId' })
  program: TourProgram;

  @ManyToOne(() => User, (user) => user.bookingsBooked, { nullable: true })
  @JoinColumn({ name: 'bookedById' })
  bookedBy: User;

  @ManyToOne(() => User, (user) => user.bookingsConfirmed, { nullable: true })
  @JoinColumn({ name: 'confirmedById' })
  confirmedBy: User;

  @ManyToOne(() => Contact, (contact) => contact.bookings, { nullable: true })
  @JoinColumn({ name: 'contactBookerId' })
  contactBooker: Contact;

  @ManyToOne(() => PaymentMethod, (pm) => pm.bookings, { nullable: true })
  @JoinColumn({ name: 'paymentMethodId' })
  paymentMethod: PaymentMethod;

  @OneToOne(() => BookingPassenger, (passenger) => passenger.booking, {
    cascade: true,
  })
  passenger: BookingPassenger;

  @BeforeInsert()
  generateBookingNo() {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.bookingNo = `BK${year}${month}${day}${random}`;
    this.issueDate = now;
  }
}
