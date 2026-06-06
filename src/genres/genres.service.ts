import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { CreateGenreDto } from './dto/create-genre.dto';

export interface Genre {
    id: number;
    name: string;
}

@Injectable()
export class GenresService {
    private genres: Genre[] = [
        { id: 1, name: 'Science Fiction' },
        { id: 2, name: 'Fantasy' },
        { id: 3, name: 'Non-fiction' },
    ];

    findAll() : Genre[] {
        return this.genres;
    }

    findOne(id: number): Genre {
        const genre = this.genres.find((g) => g.id === id);

        if (!genre) {
            throw new NotFoundException(`Genre with ID ${id} not found`);
        }

        return genre;
    }

    create(dto: CreateGenreDto): Genre {
    const newGenre: Genre = {
      id: this.genres.length ? this.genres[this.genres.length - 1].id + 1 : 1,
      ...dto,
    };

    this.genres.push(newGenre);

    return newGenre;
  }

  update(id: number, dto: UpdateGenreDto): Genre {
    const index = this.genres.findIndex((g) => g.id === id);

    if (index === -1) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }

    this.genres[index] = { ...this.genres[index], ...dto };

    return this.genres[index];
  }

  delete(id: number): Genre {
    const index = this.genres.findIndex((g) => g.id === id);

    if (index === -1) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }

    const [deletedGenre] = this.genres.splice(index, 1);

    return deletedGenre;
  }
}
