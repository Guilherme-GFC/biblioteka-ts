import { Copy } from 'src/modules/copies/entities/copy.entity';
import { Follow } from 'src/modules/follows/entities/follow.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  author: string;

  @Column()
  pages: number;

  @Column()
  releaseDate: Date;

  @OneToMany(() => Copy, (copy) => copy.book)
  copies: Copy[];

  @OneToMany(() => Follow, (follow) => follow.book)
  follows: Follow[];
}
