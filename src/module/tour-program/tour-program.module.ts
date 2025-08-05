import { Module } from '@nestjs/common';
import { TourProgramService } from './tour-program.service';
import { TourProgramController } from './tour-program.controller';

@Module({
  controllers: [TourProgramController],
  providers: [TourProgramService],
})
export class TourProgramModule {}
