import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { Game } from 'src/game/game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Card]), TypeOrmModule.forFeature([Game])],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
