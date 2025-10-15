import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Game } from 'src/game/game.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ nullable: true })
  imageId?: string;

  @Column({ nullable: true })
  text?: string;

  @Column()
  answer: string;

  @ManyToOne(() => Game, (game) => game.cards, { onDelete: 'CASCADE' })
  game: Game;

  canEdit(userId: number) {
    return this.game.canEdit(userId);
  }
}
