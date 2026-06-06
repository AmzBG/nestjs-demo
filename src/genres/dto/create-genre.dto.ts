import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreateGenreDto {
    @ApiProperty({ example: 'Science Fiction', description: 'Name of the genre' })
    @IsString()
    @MinLength(2)
    name!: string;
}