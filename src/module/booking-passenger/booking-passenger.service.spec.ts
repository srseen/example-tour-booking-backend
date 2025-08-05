import { Test, TestingModule } from '@nestjs/testing';
import { BookingPassengerService } from './booking-passenger.service';

describe('BookingPassengerService', () => {
  let service: BookingPassengerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingPassengerService],
    }).compile();

    service = module.get<BookingPassengerService>(BookingPassengerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
