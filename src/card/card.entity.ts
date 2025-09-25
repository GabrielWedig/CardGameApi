import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Game } from 'src/game/game.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imagePath: string;

  @Column()
  answer: string;

  @ManyToOne(() => Game, (game) => game.cards, { onDelete: 'CASCADE' })
  game: Game;
}
