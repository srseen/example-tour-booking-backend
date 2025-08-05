import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Booking } from './booking.entity';

@Entity('booking_passengers')
export class BookingPassenger {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  adults: number;

  @Column()
  children: number;

  @Column()
  infants: number;

  @OneToOne(() => Booking, (booking) => booking.passenger)
  @JoinColumn()
  booking: Booking;
}
