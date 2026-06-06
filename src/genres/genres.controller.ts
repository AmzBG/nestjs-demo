import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse as SwaggerResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseDto } from '../common/dto/api-response.dto';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { GenresService } from './genres.service';

@ApiTags('genres')
@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  @ApiOperation({ summary: 'Get all genres' })
  @SwaggerResponse({ type: ApiResponseDto, description: 'List of genres' })
  findAll() {
    const genres = this.genresService.findAll();

    return { success: true, data: genres };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a genre by ID' })
  @ApiParam({ name: 'id', type: Number })
  @SwaggerResponse({ type: ApiResponseDto, description: 'Single genre' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    const genre = this.genresService.findOne(id);

    return { success: true, data: genre };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new genre' })
  @ApiBody({ type: CreateGenreDto })
  @SwaggerResponse({ type: ApiResponseDto, description: 'Created genre' })
  create(@Body() dto: CreateGenreDto) {
    const genre = this.genresService.create(dto);

    return { success: true, data: genre };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a genre by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateGenreDto })
  @SwaggerResponse({ type: ApiResponseDto, description: 'Updated genre' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateGenreDto,
  ) {
    const genre = this.genresService.update(id, dto);

    return { success: true, data: genre };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a genre by ID' })
  @ApiParam({ name: 'id', type: Number })
  @SwaggerResponse({ type: ApiResponseDto, description: 'Deleted genre' })
  delete(@Param('id', ParseIntPipe) id: number) {
    const deletedGenre = this.genresService.delete(id);

    return {
      success: true,
      data: deletedGenre,
      meta: { message: `Genre ${id} deleted successfully` },
    };
  }
}