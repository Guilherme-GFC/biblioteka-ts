import { Module } from '@nestjs/common';
import { CopiesService } from './copies.service';
import { CopiesController } from './copies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Copy } from './entities/copy.entity';
import { BooksModule } from '../books/books.module';

@Module({
  imports: [TypeOrmModule.forFeature([Copy]), BooksModule],
  controllers: [CopiesController],
  providers: [CopiesService],
  exports: [TypeOrmModule, CopiesService],
})
export class CopiesModule {}
