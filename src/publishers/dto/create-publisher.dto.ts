import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreatePublisherDto {
  @ApiProperty({ example: 'Forward Mena Publishing' })
  @IsString()
  @MinLength(2)
  name!: string;
}