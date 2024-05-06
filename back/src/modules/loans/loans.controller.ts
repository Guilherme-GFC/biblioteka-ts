import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  async create(@Body() createLoanDto: CreateLoanDto) {
    const loan = await this.loansService.create(createLoanDto);
    return loan;
  }

  @Patch(':id')
  async finishLoan(@Param('id') loanId: string) {
    const loan = await this.loansService.finishLoan(loanId);
    return loan;
  }

  @Get('user/:id')
  async findLoansByUser(@Param('id') userId: string) {
    const loans = await this.loansService.findLoansByUserId(userId);
    return loans;
  }
}
