import { Copy } from 'src/modules/copies/entities/copy.entity';
import { Follow } from 'src/modules/follows/entities/follow.entity';
import { Review } from 'src/modules/reviews/entities/review.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne(() => Copy, (copy) => copy.book)
  copies: Copy[];

  @ManyToOne(() => Review, (review) => review.book)
  reviews: Review[];

  @ManyToOne(() => Follow, (follow) => follow.book)
  follows: Follow[];
}
