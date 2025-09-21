import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Game } from 'src/game/game.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  image_path: string;

  @Column()
  @ApiProperty()
  answer: string;

  @ManyToOne(() => Game, (game) => game.cards, { onDelete: 'CASCADE' })
  @ApiProperty({ type: () => Game })
  game: Game;
}
