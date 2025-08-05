import { PartialType } from '@nestjs/mapped-types';
import { CreateTourProgramDto } from './create-tour-program.dto';

export class UpdateTourProgramDto extends PartialType(CreateTourProgramDto) {}
