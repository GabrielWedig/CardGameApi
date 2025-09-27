import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from './request.entity';
import { User } from 'src/user/user.entity';
import { RequestController } from './request.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Request, User])],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}
