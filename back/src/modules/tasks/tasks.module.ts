import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { LoansModule } from '../loans/loans.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [LoansModule, UsersModule],
  providers: [TasksService],
})
export class TasksModule {}
