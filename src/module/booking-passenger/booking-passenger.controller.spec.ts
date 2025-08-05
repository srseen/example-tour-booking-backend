import { Test, TestingModule } from '@nestjs/testing';
import { BookingPassengerController } from './booking-passenger.controller';
import { BookingPassengerService } from './booking-passenger.service';

describe('BookingPassengerController', () => {
  let controller: BookingPassengerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingPassengerController],
      providers: [BookingPassengerService],
    }).compile();

    controller = module.get<BookingPassengerController>(
      BookingPassengerController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
