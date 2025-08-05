import { IsString, IsOptional, IsNumber, IsInt, Min, MinLength } from 'class-validator';

export class UpdateTourProgramDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  duration?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  adultPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  childPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  infantPrice?: number;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  maxCapacity?: number;
}
