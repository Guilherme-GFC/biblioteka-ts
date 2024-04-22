import { getRounds, hashSync } from 'bcrypt';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
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

  @Column({ length: 127 })
  password: string;

  @Column({ default: false })
  isBlocked: boolean;

  @Column({ type: 'date', nullable: true, default: null })
  startBlock: string | null;

  @Column({ default: false })
  isAdmin: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    try {
      const isEncrypted = getRounds(this.password);
      if (!isEncrypted) {
        this.password = hashSync(this.password, 10);
      }
    } catch {
      this.password = hashSync(this.password, 10);
    }
  }
}
