import { Injectable } from '@nestjs/common';
import { CreateTourProgramDto } from './dto/create-tour-program.dto';
import { UpdateTourProgramDto } from './dto/update-tour-program.dto';

@Injectable()
export class TourProgramService {
  create(createTourProgramDto: CreateTourProgramDto) {
    return 'This action adds a new tourProgram';
  }

  findAll() {
    return `This action returns all tourProgram`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tourProgram`;
  }

  update(id: number, updateTourProgramDto: UpdateTourProgramDto) {
    return `This action updates a #${id} tourProgram`;
  }

  remove(id: number) {
    return `This action removes a #${id} tourProgram`;
  }
}
