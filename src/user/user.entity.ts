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

  @Column()
  level: number;

  @OneToMany(() => Request, (request) => request.sender)
  sentRequests: Request[];

  @OneToMany(() => Request, (request) => request.receiver)
  receivedRequests: Request[];

  getFriends() {
    const acceptedSent = this.sentRequests
      .filter((req) => req.isAccepted)
      .map((req) => req.receiver);

    const acceptedReceived = this.receivedRequests
      .filter((req) => req.isAccepted)
      .map((req) => req.sender);

    return [...acceptedSent, ...acceptedReceived];
  }

  getPendingRequests() {
    return this.receivedRequests.filter((req) => !req.isAccepted);
  }

  canEdit(userId: number) {
    return this.id === userId;
  }
}
