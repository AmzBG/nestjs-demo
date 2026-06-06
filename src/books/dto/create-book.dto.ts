import { IsString, IsInt, IsArray, ArrayUnique } from 'class-validator';
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

  @ApiProperty({ example: [1, 2], description: 'Genre IDs' })
  @IsArray()
  @ArrayUnique()
  @IsInt({ each: true })
  genreIds!: number[];
}