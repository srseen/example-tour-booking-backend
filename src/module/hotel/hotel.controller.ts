import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { FilterHotelDto } from './dto/filter-hotel.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { UserRole } from '../users/entities/user.entity';

@Controller('hotel')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Post()
  @Roles(UserRole.Admin, UserRole.Manager)
  create(@Body() createHotelDto: CreateHotelDto) {
    return this.hotelService.create(createHotelDto);
  }

  @Get()
  @Roles(UserRole.Admin, UserRole.Manager, UserRole.Staff)
  findAll(@Query() filterDto: FilterHotelDto) {
    return this.hotelService.findAll(filterDto);
  }

  @Get(':id')
  @Roles(UserRole.Admin, UserRole.Manager, UserRole.Staff)
  findOne(@Param('id') id: string) {
    return this.hotelService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRole.Admin, UserRole.Manager)
  update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
    return this.hotelService.update(+id, updateHotelDto);
  }

  @Delete(':id')
  @Roles(UserRole.Admin)
  remove(@Param('id') id: string) {
    return this.hotelService.remove(+id);
  }
}
