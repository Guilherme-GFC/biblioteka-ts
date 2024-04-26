import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleConfig } from './typeorm-module-config';
import { BooksModule } from './modules/books/books.module';
import { LoansModule } from './modules/loans/loans.module';
import { CopiesModule } from './modules/copies/copies.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { FollowsModule } from './modules/follows/follows.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmModuleConfig()),
    UsersModule,
    BooksModule,
    LoansModule,
    CopiesModule,
    ReviewsModule,
    FollowsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
