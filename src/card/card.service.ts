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

    return this.cardRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const card = await this.cardRepository.findOneBy({ id });

    if (!card) {
      throw new NotFoundException('Card não encontrado');
    }

    await this.cardRepository.delete(id);
  }
}
