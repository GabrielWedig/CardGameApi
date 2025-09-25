import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getCard(id: number, userId: number) {
    const card = await this.cardRepository.findOne({
      where: { id },
      relations: ['game', 'game.createdBy'],
    });
    if (!card) {
      throw new NotFoundException('Card não encontrado');
    }
    if (!card.validateUser(userId)) {
      throw new NotFoundException('Card não encontrado');
    }
    return card;
  }

  async getGame(gameId: number, userId?: number) {
    const game = await this.gameRepository.findOne({
      where: { id: gameId },
      relations: ['createdBy'],
    });

    if (!game) {
      throw new NotFoundException('Jogo não encontrado');
    }

    if (userId && !game.validateUser(userId)) {
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
    const game = await this.getGame(data.gameId, userId);
    const card = { ...data, game };
    await this.cardRepository.save(card);
  }

  async update(id: number, data: UpdateCardDto, userId: number) {
    const card = await this.getCard(id, userId);

    card.answer = data.answer ?? card.answer;
    card.imagePath = data.imagePath ?? card.imagePath;

    await this.cardRepository.save(card);
  }

  async findByGame(gameId: number) {
    const game = await this.getGame(gameId);
    const cards = await this.cardRepository.findBy({ game });
    return this.mixCards(cards);
  }

  async remove(id: number, userId: number) {
    await this.getCard(id, userId);
    await this.cardRepository.delete(id);
  }
}
