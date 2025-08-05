// src/users/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Booking } from '../../booking/entities/booking.entity';

export enum UserRole {
  Admin = 'admin',
  Staff = 'staff',
  Manager = 'manager',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.Staff })
  role: UserRole;

  @OneToMany(() => Booking, (booking) => booking.bookedBy)
  bookingsBooked: Booking[];

  @OneToMany(() => Booking, (booking) => booking.confirmedBy)
  bookingsConfirmed: Booking[];
}
