import { Module } from '@nestjs/common';
import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';
import { UsersModule } from '../users/users.module';
import { CopiesModule } from '../copies/copies.module';
import { User } from '../users/entities/user.entity';
import { Copy } from '../copies/entities/copy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Loan]), UsersModule, CopiesModule],
  controllers: [LoansController],
  providers: [LoansService],
  exports: [TypeOrmModule],
})
export class LoansModule {}
