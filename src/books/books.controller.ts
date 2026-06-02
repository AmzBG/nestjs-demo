import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags, ApiResponse as SwaggerResponse } from '@nestjs/swagger';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiResponseDto } from '../common/dto/api-response.dto';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all books' })
  @ApiQuery({ name: 'includeAuthor', required: false, type: Boolean })
  @ApiQuery({ name: 'includePublisher', required: false, type: Boolean })
  @SwaggerResponse({ type: ApiResponseDto, description: 'List of books' })
  findAll(
    @Query('includeAuthor', new DefaultValuePipe(false), ParseBoolPipe)
    includeAuthor: boolean, 
    @Query('includePublisher', new DefaultValuePipe(false), ParseBoolPipe)
    includePublisher: boolean,
  ) {
    
    const books = this.booksService.findAll({
      includeAuthor,
      includePublisher,
    });
    
    return { success: true, data: books };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a book by ID '})
  @ApiParam({ name: 'id', type: Number })
  @ApiQuery({ name: 'includeAuthor', type: Boolean, required: false })
  @ApiQuery({ name: 'includePublisher', required: false, type: Boolean })
  @SwaggerResponse({ type: ApiResponseDto, description: 'Single book' })
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('includeAuthor', new DefaultValuePipe(false), ParseBoolPipe)
    includeAuthor: boolean,
    @Query('includePublisher', new DefaultValuePipe(false), ParseBoolPipe)
    includePublisher: boolean,
  ) {
    const book = this.booksService.findOne(id, {
      includeAuthor,
      includePublisher
    });
    
    return { success: true, data: book };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new book '})
  @ApiBody({ type: CreateBookDto })
  @SwaggerResponse({ type: ApiResponseDto, description: 'Created book' })
  create(@Body() dto: CreateBookDto) {
    const book = this.booksService.create(dto);
    
    return { success: true, data: book };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a book by ID '})
  @ApiBody({ type: UpdateBookDto })
  @SwaggerResponse({ type: ApiResponseDto, description: 'Updated book' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBookDto,
  ) {
    const book = this.booksService.update(id, dto);
    
    return { success: true, data: book };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book by ID '})
  @ApiParam({ name: 'id', type: Number })
  @SwaggerResponse({ type: ApiResponseDto, description: 'Deleted book' })
  delete(@Param('id', ParseIntPipe) id: number) {
    const deletedBook = this.booksService.delete(id);
    
    return {
      success: true, 
      data: deletedBook,
      meta: { message: `Book ${id} deleted successfully` },
    };
  }
}