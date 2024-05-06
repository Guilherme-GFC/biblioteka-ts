import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Loan } from './entities/loan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { CopiesService } from '../copies/copies.service';
import { plainToInstance } from 'class-transformer';
import { Copy } from '../copies/entities/copy.entity';

@Injectable()
export class LoansService {
  constructor(
    @InjectRepository(Loan)
    private readonly loansRepository: Repository<Loan>,
    @InjectRepository(Copy)
    private readonly copiesRepository: Repository<Copy>,
    private copiesService: CopiesService,
    private usersService: UsersService,
  ) {}

  async create({ userId, copyId, days }: CreateLoanDto) {
    const user = await this.usersService.findUserById(userId);
    const copy = await this.copiesService.findCopyById(copyId);

    const newLoan = this.loansRepository.create({
      copy: copy,
      user: user,
      expiresIn: this.genReturnDate(days),
    });

    const loan = await this.loansRepository.save(newLoan);
    copy.currentLoan = newLoan.id;
    await this.copiesRepository.save(copy);
    loan.copy.currentLoan = loan.id;

    return plainToInstance(Loan, loan);
  }

  async finishLoan(loanId: string) {
    const foundLoan = await this.findLoanById(loanId);
    if (foundLoan.returnAt) {
      throw new ForbiddenException('Loan already finished');
    }

    foundLoan.copy;
    const updatedLoan = this.loansRepository.create({
      ...foundLoan,
      returnAt: new Date(),
      copy: {
        ...foundLoan.copy,
        currentLoan: null,
      },
    });

    await this.loansRepository.save(updatedLoan);
    const loan = plainToInstance(Loan, updatedLoan);
    return loan;
  }

  async findLoansByUserId(id: string) {
    const loans = await this.loansRepository.find({
      where: {
        user: {
          id,
        },
      },
      relations: {
        copy: {
          book: true,
        },
      },
    });

    return plainToInstance(Loan, loans);
  }

  private genReturnDate(days: number = 7) {
    let date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }

  async findLoanById(id: string) {
    return await this.loansRepository
      .findOneOrFail({
        where: {
          id,
        },
        relations: {
          user: true,
          copy: true,
        },
      })
      .catch((e) => {
        if (e instanceof EntityNotFoundError) {
          throw new NotFoundException('Loan not found');
        }
        throw new NotFoundException('Loan not found');
      });
  }
}
