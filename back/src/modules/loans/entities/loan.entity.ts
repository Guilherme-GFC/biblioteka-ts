import { Copy } from 'src/modules/copies/entities/copy.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('loans')
export class Loan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  expiresIn: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: null, nullable: true })
  returnAt?: Date;

  @ManyToOne(() => User, (user) => user.loans)
  user: User;

  @ManyToOne(() => Copy, (copy) => copy.loans, { cascade: ['update'] })
  copy: Copy;
}
