import { IsString, IsOptional } from 'class-validator';
export class CreateTourProgramDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
