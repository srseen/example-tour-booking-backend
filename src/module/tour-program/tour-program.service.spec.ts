import { Test, TestingModule } from '@nestjs/testing';
import { TourProgramService } from './tour-program.service';

describe('TourProgramService', () => {
  let service: TourProgramService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TourProgramService],
    }).compile();

    service = module.get<TourProgramService>(TourProgramService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
