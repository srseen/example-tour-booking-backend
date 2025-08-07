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
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { FilterRoomDto } from './dto/filter-room.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { UserRole } from '../users/entities/user.entity';

@Controller('room')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @Roles(UserRole.Admin, UserRole.Manager)
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @Get()
  @Roles(UserRole.Admin, UserRole.Manager, UserRole.Staff)
  findAll(@Query() filterDto: FilterRoomDto) {
    return this.roomService.findAll(filterDto);
  }

  @Get(':id')
  @Roles(UserRole.Admin, UserRole.Manager, UserRole.Staff)
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRole.Admin, UserRole.Manager)
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(+id, updateRoomDto);
  }

  @Delete(':id')
  @Roles(UserRole.Admin)
  remove(@Param('id') id: string) {
    return this.roomService.remove(+id);
  }
}
