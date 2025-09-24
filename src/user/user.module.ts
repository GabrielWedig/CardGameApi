import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Nationality } from 'src/nationality/nationality.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Nationality])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
