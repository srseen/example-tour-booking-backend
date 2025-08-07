import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { BookingPassengerService } from './booking-passenger.service';
import { CreateBookingPassengerDto } from './dto/create-booking-passenger.dto';
import { UpdateBookingPassengerDto } from './dto/update-booking-passenger.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { UserRole } from '../../module/users/entities/user.entity';

@Controller('booking-passenger')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class BookingPassengerController {
  constructor(
    private readonly bookingPassengerService: BookingPassengerService,
  ) {}

  @Post()
  @Roles(UserRole.Admin, UserRole.Manager, UserRole.Staff)
  create(@Body() createBookingPassengerDto: CreateBookingPassengerDto) {
    return this.bookingPassengerService.create(createBookingPassengerDto);
  }

  @Get()
  @Roles(UserRole.Admin, UserRole.Manager, UserRole.Staff)
  findAll() {
    return this.bookingPassengerService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.Admin, UserRole.Manager, UserRole.Staff)
  findOne(@Param('id') id: string) {
    return this.bookingPassengerService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRole.Admin, UserRole.Manager, UserRole.Staff)
  update(
    @Param('id') id: string,
    @Body() updateBookingPassengerDto: UpdateBookingPassengerDto,
  ) {
    return this.bookingPassengerService.update(+id, updateBookingPassengerDto);
  }

  @Delete(':id')
  @Roles(UserRole.Admin, UserRole.Manager)
  remove(@Param('id') id: string) {
    return this.bookingPassengerService.remove(+id);
  }
}
