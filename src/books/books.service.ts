import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorsService } from '../authors/authors.service';
import { UpdateBookDto } from './dto/update-book.dto';
import { CreateBookDto } from './dto/create-book.dto';

export interface Book {
  id: number;
  name: string;
  authorId: number;
}

@Injectable()
export class BooksService {
  private books: Book[] = [
    { id: 1, name: 'The 100 Day Challenge Mindset', authorId: 1 },
    { id: 2, name: 'Learn Cloud Computing The Right Way', authorId: 2 },
    { id: 3, name: 'How to Become a Master in Software Engineering', authorId: 3 },
  ];

  constructor(private readonly authorsService: AuthorsService) {}

  findAll(includeAuthor = false): any[] {
    if (!includeAuthor) return this.books;
    return this.books.map((book) => ({
      ...book,
      author: this.authorsService.findOne(book.authorId)
    }));
  }
  
  findOne(id: number, includeAuthor = false): any {
    const book = this.books.find((book) => book.id === id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    if (includeAuthor) {
      return { ...book, author: this.authorsService.findOne(book.authorId) };
    }
    return book;
  }

  create(dto: CreateBookDto): Book {
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
    this.books[index] = { ...this.books[index], ...dto };
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
}
