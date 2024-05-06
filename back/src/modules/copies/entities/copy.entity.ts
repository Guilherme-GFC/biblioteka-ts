import { Book } from 'src/modules/books/entities/book.entity';
import { Loan } from 'src/modules/loans/entities/loan.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('copies')
export class Copy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, default: null })
  currentLoan?: string;

  @ManyToOne(() => Book, (book) => book.copies)
  book: Book;

  @OneToMany(() => Loan, (loan) => loan.copy)
  loans: Loan[];
}
