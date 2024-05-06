import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Copy } from '../copies/entities/copy.entity';
import { Not, Raw, Repository } from 'typeorm';
import { Loan } from '../loans/entities/loan.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Loan)
    private readonly loansRepository: Repository<Loan>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    await this.handleBlock();
    await this.handleUnblock();
  }

  async handleBlock() {
    const expiredLoans = await this.loansRepository.find({
      where: {
        copy: {
          currentLoan: Not(null),
        },
        expiresIn: Raw((date) => `${date} < NOW()`),
      },
    });

    if (expiredLoans.length > 0) {
      const loansIdToUpdate = expiredLoans.map((loan) => loan.id);
      await this.loansRepository
        .createQueryBuilder()
        .update()
        .set({ user: { isBlocked: true } })
        .whereInIds(loansIdToUpdate)
        .execute();
    }
    console.log('Usuarios Bloqueados');
  }

  async handleUnblock() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const users = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.isBlocked = TRUE')
      .andWhere('DATE(user.releaseIn) = :today', {
        today: today.toISOString().slice(0, 10),
      })
      .getMany();

    if (users.length > 0) {
      const usersIdToUpdate = users.map((user) => user.id);
      await this.usersRepository
        .createQueryBuilder('user')
        .update()
        .set({ isBlocked: false, releaseIn: null })
        .whereInIds(usersIdToUpdate)
        .execute();
    }
    console.log('Usuarios Desbloqueados');
  }
}
