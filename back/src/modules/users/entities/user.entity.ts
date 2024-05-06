import { Exclude } from 'class-transformer';
import { Follow } from 'src/modules/follows/entities/follow.entity';
import { Loan } from 'src/modules/loans/entities/loan.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 127 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column({ length: 127 })
  password: string;

  @Column({ default: false })
  isBlocked: boolean;

  @Column({ type: 'date', nullable: true, default: null })
  releaseIn?: Date;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => Loan, (loan) => loan.user)
  loans: Loan[];

  @OneToMany(() => Follow, (follow) => follow.user)
  follows: Follow[];
}
