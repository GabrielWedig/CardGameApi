import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Card } from 'src/card/card.entity';
import { User } from 'src/user/user.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ['public', 'private', 'friends'],
    default: 'public',
  })
  visibility: 'public' | 'private' | 'friends';

  @OneToMany(() => Card, (card) => card.game)
  cards: Card[];

  @ManyToOne(() => User, (user) => user.games, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'createdBy' })
  createdBy: User;

  canEdit(userId: number) {
    return this.createdBy.id === userId;
  }
}
