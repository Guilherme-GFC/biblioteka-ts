import { IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateLoanDto {
  @IsString()
  userId: string;

  @IsString()
  copyId: string;

  @IsOptional()
  @IsPositive()
  days?: number;
}
