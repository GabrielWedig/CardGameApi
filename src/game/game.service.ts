import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './game.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { User } from 'src/user/user.entity';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
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

  async create(data: CreateGameDto, userId: number) {
    const user = await this.getUser(userId);
    const game = { ...data, createdBy: user };
    await this.gameRepository.save(game);
  }

  async update(id: number, data: UpdateGameDto, userId: number) {
    const game = await this.getGame(id, ['createdBy']);

    if (!game.canEdit(userId)) {
      throw new UnauthorizedException();
    }

    game.name = data.name ?? game.name;
    await this.gameRepository.save(game);
  }

  async findAll() {
    const games = await this.gameRepository.find({
      relations: ['cards', 'createdBy'],
    });

    return games.map((game) => ({
      ...game,
      cards: game.cards.length,
      createdBy: game.createdBy.displayName,
    }));
  }

  async findOne(id: number) {
    const game = await this.getGame(id, ['cards', 'createdBy']);

    return {
      ...game,
      cards: game.cards.length,
      createdBy: game.createdBy.displayName,
    };
  }

  async remove(id: number, userId: number) {
    const game = await this.getGame(id, ['createdBy']);

    if (!game.canEdit(userId)) {
      throw new UnauthorizedException();
    }

    await this.gameRepository.delete(id);
  }
}
