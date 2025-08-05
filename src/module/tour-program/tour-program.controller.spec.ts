import { Test, TestingModule } from '@nestjs/testing';
import { TourProgramController } from './tour-program.controller';
import { TourProgramService } from './tour-program.service';

describe('TourProgramController', () => {
  let controller: TourProgramController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TourProgramController],
      providers: [TourProgramService],
    }).compile();

    controller = module.get<TourProgramController>(TourProgramController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
