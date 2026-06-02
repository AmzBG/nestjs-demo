import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';

export interface Publisher {
  id: number;
  name: string;
}

@Injectable()
export class PublishersService {
  private publishers: Publisher[] = [
    { id: 1, name: 'Forward Mena Publishing' },
    { id: 2, name: 'Tech Reads Publishing' },
  ];

  findAll(): Publisher[] {
    return this.publishers;
  }

  findOne(id: number): Publisher {
    const publisher = this.publishers.find((p) => p.id === id);
    if (!publisher) {
        throw new NotFoundException(`Publisher with ID ${id} not found`);
    }
    return publisher;
  }

  create(dto: CreatePublisherDto): Publisher {
    const newPublisher: Publisher = {
      id: this.publishers.length ? this.publishers[this.publishers.length - 1].id + 1 : 1,
      ...dto,
    };
    this.publishers.push(newPublisher);
    return newPublisher;
  }

  update(id: number, dto: UpdatePublisherDto): Publisher {
    const index = this.publishers.findIndex((p) => p.id === id);
    if (index === -1) {
        throw new NotFoundException(`Publisher with ID ${id} not found`);
    }
    this.publishers[index] = { ...this.publishers[index], ...dto };
    return this.publishers[index];
  }

  delete(id: number): Publisher {
    const index = this.publishers.findIndex((p) => p.id === id);
    if (index === -1) {
        throw new NotFoundException(`Publisher with ID ${id} not found`);
    }
    const [deletedPublisher] = this.publishers.splice(index, 1);
    return deletedPublisher;
  }

}
