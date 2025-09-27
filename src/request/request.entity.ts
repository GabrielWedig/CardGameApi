import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.sentRequests, { onDelete: 'CASCADE' })
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedRequests, {
    onDelete: 'CASCADE',
  })
  receiver: User;

  @Column({ default: false })
  isAccepted: boolean;

  canAnswer(userId: number) {
    return this.receiver.id === userId;
  }
}
