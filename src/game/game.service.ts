import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './game.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  async create(data: Partial<Game>) {
    await this.gameRepository.save(data);
  }

  async update(id: number, data: Partial<Game>) {
    const game = await this.gameRepository.findOneBy({ id });

    if (!game) {
      throw new NotFoundException('Jogo não encontrado');
    }

    await this.gameRepository.update(id, data);
  }

  findAll() {
    return this.gameRepository.find();
  }

  async findOne(id: number) {
    const game = await this.gameRepository.findOneBy({ id });

    if (!game) {
      throw new NotFoundException('Jogo não encontrado');
    }

    return this.gameRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const game = await this.gameRepository.findOneBy({ id });

    if (!game) {
      throw new NotFoundException('Jogo não encontrado');
    }

    await this.gameRepository.delete(id);
  }
}
