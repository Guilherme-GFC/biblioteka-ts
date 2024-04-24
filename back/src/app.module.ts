import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleConfig } from './typeorm-module-config';
import { BooksModule } from './modules/books/books.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmModuleConfig()), UsersModule, BooksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
