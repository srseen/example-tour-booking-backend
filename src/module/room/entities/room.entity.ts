// src/rooms/room.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Hotel } from '../../hotel/entities/hotel.entity';
import { Booking } from '../../booking/entities/booking.entity';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roomNumber: string;

  @Column({ nullable: true })
  roomType: string;

  @Column({ nullable: true })
  capacity: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  pricePerNight: number;

  @Column('text', { nullable: true })
  description: string;

  @Column()
  hotelId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Hotel, (hotel) => hotel.rooms)
  @JoinColumn({ name: 'hotelId' })
  hotel: Hotel;

  @OneToMany(() => Booking, (booking) => booking.room)
  bookings: Booking[];
}
