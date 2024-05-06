import { Controller, Get, Param, Post } from '@nestjs/common';
import { CopiesService } from './copies.service';

@Controller('copies')
export class CopiesController {
  constructor(private readonly copiesService: CopiesService) {}

  @Get(':id')
  async findCopy(@Param('id') copyId: string) {
    const copy = await this.copiesService.findCopy(copyId);
    return copy;
  }

  @Post('book/:id')
  async create(@Param('id') bookId: string) {
    const copy = await this.copiesService.create(bookId);
    return copy;
  }
}
