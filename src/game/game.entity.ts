import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Card } from 'src/card/card.entity';

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
}
