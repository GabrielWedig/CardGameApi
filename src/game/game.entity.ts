import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Card } from 'src/card/card.entity';
import { User } from 'src/user/user.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @OneToMany(() => Card, (card) => card.game)
  cards: Card[];

  @ManyToOne(() => User, (user) => user.games, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @ApiProperty({ type: () => User })
  createdBy: User;
}
