import { IsString, IsOptional, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: '0812345678' })
  @IsString()
  phone: string;

  @ApiProperty({ example: 'john.doe@example.com', required: false })
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'Example Corp', required: false })
  @IsOptional()
  @IsString()
  company?: string;

  @ApiProperty({ example: 'Developer', required: false })
  @IsOptional()
  @IsString()
  position?: string;
}
