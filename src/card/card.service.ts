import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './card.entity';
import { Game } from 'src/game/game.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  async getCard(id: number, relations: string[]) {
    const card = await this.cardRepository.findOne({
      where: { id },
      relations,
    });
    if (!card) {
      throw new NotFoundException('Card não encontrado');
    }
    return card;
  }

  async getGame(id: number, relations?: string[]) {
    const game = await this.gameRepository.findOne({
      where: { id },
      relations,
    });

    if (!game) {
      throw new NotFoundException('Jogo não encontrado');
    }
    return game;
  }

  mixCards(cards: Card[]) {
    return cards
      .map((card) => ({ card, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ card }) => card);
  }

  async create(data: CreateCardDto, userId: number) {
    const game = await this.getGame(data.gameId, ['createdBy']);

    if (!game.canEdit(userId)) {
      throw new UnauthorizedException();
    }

    const card = { ...data, game };
    await this.cardRepository.save(card);
  }

  async update(id: number, data: UpdateCardDto, userId: number) {
    const card = await this.getCard(id, ['game', 'game.createdBy']);

    if (!card.canEdit(userId)) {
      throw new UnauthorizedException();
    }

    card.answer = data.answer ? data.answer : card.answer;
    card.imageUrl = data.imageUrl ? data.imageUrl : card.imageUrl;
    card.imageId = data.imageId ? data.imageId : card.imageId;

    await this.cardRepository.save(card);
  }

  async findByGame(gameId: number) {
    const cards = await this.cardRepository.find({
      where: { game: { id: gameId } },
    });
    return this.mixCards(cards).map(({ imageId, ...rest }) => rest);
  }

  async remove(id: number, userId: number) {
    const card = await this.getCard(id, ['game', 'game.createdBy']);

    if (!card.canEdit(userId)) {
      throw new UnauthorizedException();
    }

    await this.cardRepository.delete(id);
  }
}
