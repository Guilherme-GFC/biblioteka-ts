import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

interface IUserRelations {
  loans?: boolean;
  reviews?: boolean;
  follows?: boolean;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);

    return plainToInstance(User, user);
  }

  async findAll() {
    const users = await this.userRepository.find();
    return plainToInstance(User, users);
  }

  async findOne(id: string) {
    const user = this.findUserById(id);
    return plainToInstance(User, user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    const updatedUser = this.userRepository.create({
      ...user,
      ...updateUserDto,
    });

    const returnUser = await this.userRepository.save(updatedUser);

    return plainToInstance(User, returnUser);
  }

  async remove(id: string) {
    await this.userRepository.delete(id);
  }

  async findUserById(id: string, relations: IUserRelations = {}) {
    return await this.userRepository
      .findOneOrFail({ where: { id: id }, relations: { ...relations } })
      .catch((e) => {
        if (e instanceof EntityNotFoundError)
          throw new NotFoundException('User not Found');

        console.log(e);
        throw new InternalServerErrorException();
      });
  }
}
