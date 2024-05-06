import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

interface IBookRelations {
  loans?: boolean;
  reviews?: boolean;
  follows?: boolean;
}

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const book = this.bookRepository.create(createBookDto);
    return await this.bookRepository.save(book);
  }

  async findAll() {
    return await this.bookRepository.find();
  }

  async findOne(id: string) {
    const book = await this.bookRepository.findOneBy({ id });
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const foundBook = await this.bookRepository.findOneBy({ id });
    const updatedBook = this.bookRepository.create({
      ...foundBook,
      ...updateBookDto,
    });

    return await this.bookRepository.save(updatedBook);
  }

  async remove(id: string) {
    await this.bookRepository.delete({ id });
  }

  async findBookById(id: string, relations: IBookRelations = {}) {
    return await this.bookRepository
      .findOneOrFail({ where: { id }, relations: { ...relations } })
      .catch((e) => {
        if (e instanceof EntityNotFoundError) {
          throw new NotFoundException('Book not found');
        }
        console.log(e);
        throw new InternalServerErrorException();
      });
  }
}
