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

  @OneToMany(() => Card, (card) => card.game)
  cards: Card[];

  @ManyToOne(() => User, (user) => user.games, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'createdBy' })
  createdBy: User;

  validateUser(userId: number) {
    return userId === this.createdBy.id;
  }
}
