import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity()
export class Nationality {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  imageUrl: string;

  @OneToMany(() => User, (user) => user.nationality)
  users: User[];
}
