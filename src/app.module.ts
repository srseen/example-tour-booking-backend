import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './module/auth/auth.module';
import { UsersModule } from './module/users/users.module';
import { CustomerModule } from './module/customer/customer.module';
import { ContactModule } from './module/contact/contact.module';
import { HotelModule } from './module/hotel/hotel.module';
import { RoomModule } from './module/room/room.module';
import { TourProgramModule } from './module/tour-program/tour-program.module';
import { PaymentMethodModule } from './module/payment-method/payment-method.module';
import { BookingPassengerModule } from './module/booking-passenger/booking-passenger.module';
import { BookingModule } from './module/booking/booking.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: parseInt(config.get<string>('DB_PORT') || '5432', 10),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true, // Note: Set to false in production
      }),
    }),
    AuthModule,
    UsersModule,
    CustomerModule,
    ContactModule,
    HotelModule,
    RoomModule,
    TourProgramModule,
    PaymentMethodModule,
    BookingPassengerModule,
    BookingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
