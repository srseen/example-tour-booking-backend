// src/rooms/room.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Hotel } from '../../hotel/entities/hotel.entity';
import { Booking } from '../../booking/entities/booking.entity';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roomNumber: string;

  @ManyToOne(() => Hotel, (hotel) => hotel.rooms)
  hotel: Hotel;

  @OneToMany(() => Booking, (booking) => booking.room)
  bookings: Booking[];
}
