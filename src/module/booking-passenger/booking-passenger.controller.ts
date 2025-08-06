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
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('booking-passenger')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class BookingPassengerController {
  constructor(
    private readonly bookingPassengerService: BookingPassengerService,
  ) {}

  @Post()
  @Roles('admin', 'manager', 'staff')
  create(@Body() createBookingPassengerDto: CreateBookingPassengerDto) {
    return this.bookingPassengerService.create(createBookingPassengerDto);
  }

  @Get()
  @Roles('admin', 'manager', 'staff')
  findAll() {
    return this.bookingPassengerService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'manager', 'staff')
  findOne(@Param('id') id: string) {
    return this.bookingPassengerService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin', 'manager', 'staff')
  update(
    @Param('id') id: string,
    @Body() updateBookingPassengerDto: UpdateBookingPassengerDto,
  ) {
    return this.bookingPassengerService.update(+id, updateBookingPassengerDto);
  }

  @Delete(':id')
  @Roles('admin', 'manager')
  remove(@Param('id') id: string) {
    return this.bookingPassengerService.remove(+id);
  }
}
