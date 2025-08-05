import { IsString, IsOptional, IsBoolean, MinLength } from 'class-validator';

export class UpdatePaymentMethodDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  displayName?: string;
  
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
