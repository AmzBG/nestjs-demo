import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorsService } from '../authors/authors.service';
import { UpdateBookDto } from './dto/update-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { PublishersService } from 'src/publishers/publishers.service';

export interface Book {
  id: number;
  name: string;
  authorId: number;
  publisherId?: number;
}

interface FindBookOptions {
  includeAuthor?: boolean;
  includePublisher?: boolean;
}

@Injectable()
export class BooksService {
  private books: Book[] = [
    {
      id: 1,
      name: 'The 100 Day Challenge Mindset',
      authorId: 1,
      publisherId: 1,
    },
    {
      id: 2,
      name: 'Learn Cloud Computing The Right Way',
      authorId: 2,
      publisherId: 2,
    },
    {
      id: 3,
      name: 'How to Become a Master in Software Engineering',
      authorId: 3,
      publisherId: 1,
    },
  ];

  constructor(private readonly authorsService: AuthorsService, private readonly publishersService: PublishersService) {}

  findAll(options: FindBookOptions = {}) {
    return this.books.map((book) => this.buildBookResponse(book, options));
  }
  
  findOne(id: number, options: FindBookOptions = {}) {
    const book = this.books.find((book) => book.id === id);
    
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return this.buildBookResponse(book, options);
  }

  create(dto: CreateBookDto): Book {
    this.authorsService.findOne(dto.authorId);
    this.publishersService.findOne(dto.publisherId);

    const newBook: Book = {
      id: this.books.length ? this.books[this.books.length - 1].id + 1 : 1,
      ...dto,
    };
    
    this.books.push(newBook);
    
    return newBook;
  }

  update(id: number, dto: UpdateBookDto): Book {
    const index = this.books.findIndex((book) => book.id === id);
    
    if (index === -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    if (dto.authorId !== undefined) {
      this.authorsService.findOne(dto.authorId);
    }

    if (dto.publisherId !== undefined) {
      this.publishersService.findOne(dto.publisherId);
    }

    this.books[index] = { 
      ...this.books[index],
      ...dto
    };
    
    return this.books[index];
  }

  delete(id: number): Book {
    const index = this.books.findIndex((book) => book.id === id);
    
    if (index === -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    
    const [deletedBook] = this.books.splice(index, 1);
    
    return deletedBook;
  }

  private buildBookResponse(book: Book, options: FindBookOptions) {
    return {
      ...book,
      ...(options.includeAuthor
        ? { author: this.authorsService.findOne(book.authorId) }
        : {}),
      ...(options.includePublisher && book.publisherId
        ? { publisher: this.publishersService.findOne(book.publisherId) }
        : {}),
    };
  }
}
