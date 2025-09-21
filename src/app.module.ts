import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import AppDataSource from '../data-source';
import { GameModule } from './game/game.module';
import { CardModule } from './card/card.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(AppDataSource.options),
    GameModule,
    CardModule,
  ],
})
export class AppModule {}
