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
import { TourProgramService } from './tour-program.service';
import { CreateTourProgramDto } from './dto/create-tour-program.dto';
import { UpdateTourProgramDto } from './dto/update-tour-program.dto';
import { FilterTourProgramDto } from './dto/filter-tour-program.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { UserRole } from '../users/entities/user.entity';

@Controller('tour-program')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class TourProgramController {
  constructor(private readonly tourProgramService: TourProgramService) {}

  @Post()
  @Roles(UserRole.Admin, UserRole.Manager)
  create(@Body() createTourProgramDto: CreateTourProgramDto) {
    return this.tourProgramService.create(createTourProgramDto);
  }

  @Get()
  @Roles(UserRole.Admin, UserRole.Manager, UserRole.Staff)
  findAll(@Query() filterDto: FilterTourProgramDto) {
    return this.tourProgramService.findAll(filterDto);
  }

  @Get(':id')
  @Roles(UserRole.Admin, UserRole.Manager, UserRole.Staff)
  findOne(@Param('id') id: string) {
    return this.tourProgramService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRole.Admin, UserRole.Manager)
  update(
    @Param('id') id: string,
    @Body() updateTourProgramDto: UpdateTourProgramDto,
  ) {
    return this.tourProgramService.update(+id, updateTourProgramDto);
  }

  @Delete(':id')
  @Roles(UserRole.Admin)
  remove(@Param('id') id: string) {
    return this.tourProgramService.remove(+id);
  }
}
