import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
export class CreatePaymentMethodDto {
  @IsInt()
  bookingId: number;

  @IsNumber()
  totalPrice: number;

  @IsNumber()
  deposit: number;

  @IsNumber()
  cashOnTour: number;

  @IsOptional()
  @IsString()
  paymentMethod?: string;
}
