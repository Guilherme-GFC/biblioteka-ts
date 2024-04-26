import { Follow } from 'src/modules/follows/entities/follow.entity';
import { Loan } from 'src/modules/loans/entities/loan.entity';
import { Review } from 'src/modules/reviews/entities/review.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 127 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 127 })
  password: string;

  @Column({ default: false })
  isBlocked: boolean;

  @Column({ type: 'date', nullable: true, default: null })
  startBlock: string | null;

  @Column({ default: false })
  isAdmin: boolean;

  @ManyToOne(() => Loan, (loan) => loan.user)
  loans: Loan[];

  @ManyToOne(() => Review, (review) => review.user)
  reviews: Review[];

  @ManyToOne(() => Follow, (follow) => follow.user)
  follows: Follow[];
}
