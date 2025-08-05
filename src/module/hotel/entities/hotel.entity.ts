// src/hotels/hotel.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Room } from '../../room/entities/room.entity';
import { Booking } from '../../booking/entities/booking.entity';

@Entity('hotels')
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Room, (room) => room.hotel)
  rooms: Room[];

  @OneToMany(() => Booking, (booking) => booking.hotel)
  bookings: Booking[];
}
