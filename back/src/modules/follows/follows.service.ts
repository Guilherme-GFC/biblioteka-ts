import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Follow } from './entities/follow.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BooksService } from '../books/books.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class FollowsService {
  constructor(
    @InjectRepository(Follow)
    private readonly followRepository: Repository<Follow>,
    private booksService: BooksService,
    private usersService: UsersService,
  ) {}

  async followBook(userId: string, bookId: string) {
    const book = await this.booksService.findBookById(bookId);
    const user = await this.usersService.findUserById(userId);

    const newFollow = this.followRepository.create({
      book,
      user,
    });

    return await this.followRepository.save(newFollow);
  }

  async unfollowBook(followId: string) {
    await this.followRepository.delete(followId);
  }

  async followList(userId: string) {
    const user = await this.usersService.findUserById(userId);
    const followsList = await this.followRepository.find({
      where: {
        user: user,
      },
    });

    return followsList;
  }
}
