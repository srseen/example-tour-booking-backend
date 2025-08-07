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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { TourProgramService } from './tour-program.service';
import { CreateTourProgramDto } from './dto/create-tour-program.dto';
import { UpdateTourProgramDto } from './dto/update-tour-program.dto';
import { FilterTourProgramDto } from './dto/filter-tour-program.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('tour-program')
@ApiBearerAuth()
@Controller('tour-program')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class TourProgramController {
  constructor(private readonly tourProgramService: TourProgramService) {}

  @Post()
  @Roles(UserRole.Admin, UserRole.Manager)
  @ApiOperation({ summary: 'Create a new tour program' })
  @ApiResponse({
    status: 201,
    description: 'The tour program has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createTourProgramDto: CreateTourProgramDto) {
    return this.tourProgramService.create(createTourProgramDto);
  }

  @Get()
  @Roles(UserRole.Admin, UserRole.Manager, UserRole.Staff)
  @ApiOperation({ summary: 'Get all tour programs' })
  @ApiResponse({ status: 200, description: 'Return all tour programs.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll(@Query() filterDto: FilterTourProgramDto) {
    return this.tourProgramService.findAll(filterDto);
  }

  @Get(':id')
  @Roles(UserRole.Admin, UserRole.Manager, UserRole.Staff)
  @ApiOperation({ summary: 'Get a tour program by id' })
  @ApiResponse({ status: 200, description: 'Return a tour program.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  findOne(@Param('id') id: string) {
    return this.tourProgramService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRole.Admin, UserRole.Manager)
  @ApiOperation({ summary: 'Update a tour program' })
  @ApiResponse({
    status: 200,
    description: 'The tour program has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  update(
    @Param('id') id: string,
    @Body() updateTourProgramDto: UpdateTourProgramDto,
  ) {
    return this.tourProgramService.update(+id, updateTourProgramDto);
  }

  @Delete(':id')
  @Roles(UserRole.Admin)
  @ApiOperation({ summary: 'Delete a tour program' })
  @ApiResponse({
    status: 200,
    description: 'The tour program has been successfully deleted.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  remove(@Param('id') id: string) {
    return this.tourProgramService.remove(+id);
  }
}
