import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleConfig } from './typeorm-module-config';
import { BooksModule } from './modules/books/books.module';
import { LoansModule } from './modules/loans/loans.module';
import { FollowsModule } from './modules/follows/follows.module';
import { CopiesModule } from './modules/copies/copies.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmModuleConfig()),
    ScheduleModule.forRoot(),
    TasksModule,
    UsersModule,
    BooksModule,
    LoansModule,
    FollowsModule,
    CopiesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
