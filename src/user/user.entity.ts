import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { Game } from 'src/game/game.entity';
import { Nationality } from 'src/nationality/nationality.entity';

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

  @ManyToMany(() => User, (user) => user.friends)
  @JoinTable()
  friends: User[];

  canEdit(userId: number) {
    return this.id === userId;
  }
}
