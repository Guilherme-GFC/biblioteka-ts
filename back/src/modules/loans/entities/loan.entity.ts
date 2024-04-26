import { Copy } from 'src/modules/copies/entities/copy.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('loans')
export class Loan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  returnAt: Date;

  @OneToMany(() => User, (user) => user.loans)
  user: User;

  @OneToMany(() => Copy, (copy) => copy.loans)
  copy: Copy;
}
