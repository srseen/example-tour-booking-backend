import { IsString, IsOptional, IsBoolean, MinLength } from 'class-validator';

export class CreatePaymentMethodDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @MinLength(2)
  displayName: string;
  
  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}
