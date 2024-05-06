import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Copy } from './entities/copy.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BooksService } from '../books/books.service';

interface ICopyRelations {
  loans?: boolean;
  book?: boolean;
}

@Injectable()
export class CopiesService {
  constructor(
    @InjectRepository(Copy) private readonly copiesRepository: Repository<Copy>,
    private readonly booksService: BooksService,
  ) {}

  async create(bookId: string) {
    const book = await this.booksService.findBookById(bookId);
    const newCopy = this.copiesRepository.create({
      book: book,
    });

    return await this.copiesRepository.save(newCopy);
  }

  async findCopy(copyId: string) {
    const copy = await this.findCopyById(copyId, { book: true });
    return copy;
  }

  async findCopyById(id: string, relations: ICopyRelations = {}) {
    return await this.copiesRepository
      .findOneOrFail({
        where: { id },
        relations: {
          ...relations,
        },
      })
      .catch((e) => {
        if (e instanceof EntityNotFoundError) {
          throw new NotFoundException('Copy not found');
        }

        console.log(e);
        throw new InternalServerErrorException();
      });
  }
}
