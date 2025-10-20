import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { Game } from 'src/game/game.entity';
import { CloudinaryService } from 'src/common/services/cloudinary.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Card]),
    TypeOrmModule.forFeature([Game]),
    HttpModule,
  ],
  controllers: [CardController],
  providers: [CardService, CloudinaryService],
})
export class CardModule {}
