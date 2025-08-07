import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TourProgramService } from './tour-program.service';
import { TourProgramController } from './tour-program.controller';
import { TourProgram } from './entities/tour-program.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TourProgram])],
  controllers: [TourProgramController],
  providers: [TourProgramService],
  exports: [TypeOrmModule, TourProgramService],
})
export class TourProgramModule {}
