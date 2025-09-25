import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './card.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
  ) {}

  async create(data: Partial<Card>) {
    await this.cardRepository.save(data);
  }

  async update(id: number, data: Partial<Card>) {
    const card = await this.cardRepository.findOneBy({ id });

    if (!card) {
      throw new NotFoundException('Card não encontrado');
    }

    await this.cardRepository.update(id, data);
  }

  findAll() {
    return this.cardRepository.find();
  }

  async findOne(id: number) {
    const card = await this.cardRepository.findOneBy({ id });

    if (!card) {
      throw new NotFoundException('Card não encontrado');
    }

    return card;
  }

  // const shuffledCards = [...game.cards];
  // for (let i = shuffledCards.length - 1; i > 0; i--) {
  //   const j = Math.floor(Math.random() * (i + 1));
  //   [shuffledCards[i], shuffledCards[j]] = [
  //     shuffledCards[j],
  //     shuffledCards[i],
  //   ];
  // }

  // game.cards = shuffledCards;

  async remove(id: number) {
    const card = await this.cardRepository.findOneBy({ id });

    if (!card) {
      throw new NotFoundException('Card não encontrado');
    }

    await this.cardRepository.delete(id);
  }
}
