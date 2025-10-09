import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Game } from 'src/game/game.entity';
import { Nationality } from 'src/nationality/nationality.entity';
import { Request } from 'src/request/request.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  password: string;

  @Column()
  displayName: string;

  @Column()
  photo: string;

  @ManyToOne(() => Nationality, (nationality) => nationality.users, {
    onDelete: 'CASCADE',
  })
  nationality: Nationality;

  @Column({ nullable: true })
  about: string;

  @Column()
  since: Date;

  @OneToMany(() => Game, (game) => game.createdBy)
  games: Game[];

  @OneToMany(() => Request, (request) => request.sender)
  sentRequests: Request[];

  @OneToMany(() => Request, (request) => request.receiver)
  receivedRequests: Request[];
}
