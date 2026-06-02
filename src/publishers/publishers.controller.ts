import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse as SwaggerResponse,
  ApiBody,
} from '@nestjs/swagger';
import { PublishersService } from './publishers.service';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { ApiResponseDto } from '../common/dto/api-response.dto';

@ApiTags('publishers')
@Controller('publishers')
export class PublishersController {
  constructor(private readonly publishersService: PublishersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all publishers' })
  @SwaggerResponse({ type: ApiResponseDto, description: 'List of publishers' })
  findAll() {
    const publishers = this.publishersService.findAll();
    return { success: true, data: publishers };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a publisher by ID' })
  @ApiParam({ name: 'id', type: Number })
  @SwaggerResponse({ type: ApiResponseDto, description: 'Single publisher' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    const publisher = this.publishersService.findOne(id);
    return { success: true, data: publisher };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new publisher' })
  @ApiBody({ type: CreatePublisherDto })
  @SwaggerResponse({ type: ApiResponseDto, description: 'Created publisher' })
  create(@Body() dto: CreatePublisherDto) {
    const publisher = this.publishersService.create(dto);
    return { success: true, data: publisher };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a publisher by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdatePublisherDto })
  @SwaggerResponse({ type: ApiResponseDto, description: 'Updated publisher' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePublisherDto,
  ) {
    const publisher = this.publishersService.update(id, dto);
    return { success: true, data: publisher };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a publisher by ID' })
  @ApiParam({ name: 'id', type: Number })
  @SwaggerResponse({ type: ApiResponseDto, description: 'Deleted publisher' })
  delete(@Param('id', ParseIntPipe) id: number) {
    const deletedPublisher = this.publishersService.delete(id);
    return {
      success: true,
      data: deletedPublisher,
      meta: { message: `Publisher ${id} deleted successfully` },
    };
  }
}