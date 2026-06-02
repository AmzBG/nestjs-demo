import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ example: 'The 100 Day Challenge Mindset' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 1, description: 'Author ID' })
  @IsInt()
  authorId!: number;

  @ApiProperty({ example: 1, description: 'Publisher ID' })
  @IsInt()
  publisherId!: number;
}