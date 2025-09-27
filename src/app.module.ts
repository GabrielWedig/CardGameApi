import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import AppDataSource from '../data-source';
import { GameModule } from './game/game.module';
import { CardModule } from './card/card.module';
import { UserModule } from './user/user.module';
import { NationalityModule } from './nationality/nationality.module';
import { AuthModule } from './auth/auth.module';
import { RequestModule } from './request/request.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(AppDataSource.options),
    GameModule,
    CardModule,
    UserModule,
    NationalityModule,
    AuthModule,
    RequestModule,
  ],
})
export class AppModule {}
