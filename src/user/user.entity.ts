import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Game } from 'src/game/game.entity';
import { Nationality } from 'src/nationality/nationality.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ unique: true })
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  password: string;

  @Column()
  @ApiProperty()
  displayName: string;

  @Column()
  @ApiProperty()
  photo: string;

  @ManyToOne(() => Nationality, (nationality) => nationality.users, {
    onDelete: 'CASCADE',
  })
  @ApiProperty({ type: () => Nationality })
  nationality: Nationality;

  @Column({ nullable: true })
  @ApiProperty()
  about: string;

  @Column()
  @ApiProperty()
  since: Date;

  @OneToMany(() => Game, (game) => game.createdBy)
  games: Game[];

  @Column()
  @ApiProperty()
  level: number;

  @ManyToMany(() => User, (user) => user.friends)
  @JoinTable()
  friends: User[];
}
