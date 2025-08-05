import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookingPassengerService } from './booking-passenger.service';
import { CreateBookingPassengerDto } from './dto/create-booking-passenger.dto';
import { UpdateBookingPassengerDto } from './dto/update-booking-passenger.dto';

@Controller('booking-passenger')
export class BookingPassengerController {
  constructor(
    private readonly bookingPassengerService: BookingPassengerService,
  ) {}

  @Post()
  create(@Body() createBookingPassengerDto: CreateBookingPassengerDto) {
    return this.bookingPassengerService.create(createBookingPassengerDto);
  }

  @Get()
  findAll() {
    return this.bookingPassengerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingPassengerService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookingPassengerDto: UpdateBookingPassengerDto,
  ) {
    return this.bookingPassengerService.update(+id, updateBookingPassengerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingPassengerService.remove(+id);
  }
}
