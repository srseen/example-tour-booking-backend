import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TourProgramService } from './tour-program.service';
import { CreateTourProgramDto } from './dto/create-tour-program.dto';
import { UpdateTourProgramDto } from './dto/update-tour-program.dto';

@Controller('tour-program')
export class TourProgramController {
  constructor(private readonly tourProgramService: TourProgramService) {}

  @Post()
  create(@Body() createTourProgramDto: CreateTourProgramDto) {
    return this.tourProgramService.create(createTourProgramDto);
  }

  @Get()
  findAll() {
    return this.tourProgramService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tourProgramService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTourProgramDto: UpdateTourProgramDto,
  ) {
    return this.tourProgramService.update(+id, updateTourProgramDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tourProgramService.remove(+id);
  }
}
