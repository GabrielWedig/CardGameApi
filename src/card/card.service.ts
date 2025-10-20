import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Card } from './card.entity';
import { Game } from 'src/game/game.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { FilterPaginationDto } from 'src/common/dto/pagination.dto';
import { buildFilter, paginated } from 'src/common/buildFilter';
import { CloudinaryService } from 'src/common/services/cloudinary.service';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    private cloudinaryService: CloudinaryService,
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

  async create(
    data: CreateCardDto,
    userId: number,
    image?: Express.Multer.File,
  ) {
    const game = await this.getGame(data.gameId, ['createdBy']);

    if (!game.canEdit(userId)) {
      throw new UnauthorizedException();
    }

    if (image && data.text) {
      throw new BadRequestException(
        'A pergunta deve ser Texto ou Imagem, nunca os dois juntos.',
      );
    }

    const card = { ...data, game };

    if (image) {
      const response = await this.cloudinaryService.uploadImage(
        image.buffer,
        'games',
      );
      Object.assign(card, {
        imageUrl: response.url,
        imageId: response.publicId,
      });
    }
    await this.cardRepository.save(card);
  }

  async update(
    id: number,
    data: UpdateCardDto,
    userId: number,
    image?: Express.Multer.File,
  ) {
    const card = await this.getCard(id, ['game', 'game.createdBy']);

    if (!card.canEdit(userId)) {
      throw new UnauthorizedException();
    }

    if (image && data.text) {
      throw new BadRequestException(
        'A pergunta deve ser Texto ou Imagem, nunca os dois juntos.',
      );
    }

    card.answer = data.answer ? data.answer : card.answer;
    card.text = data.text ? data.text : card.text;

    if (image) {
      if (card.imageId && card.imageUrl) {
        await this.cloudinaryService.deleteImage(card.imageId);
      }
      const response = await this.cloudinaryService.uploadImage(
        image.buffer,
        'games',
      );

      card.imageUrl = response.url;
      card.imageId = response.publicId;
    }

    await this.cardRepository.save(card);
  }

  async play(gameId: number) {
    const cards = await this.cardRepository.find({
      where: { game: { id: gameId } },
    });
    return this.mixCards(cards).map(({ imageId, ...rest }) => rest);
  }

  async findByGame(gameId: number, params: FilterPaginationDto) {
    const { skip, take, limit, page } = paginated(params);

    const where = buildFilter<Card>({
      search: params.search,
      defaultWhere: { game: { id: gameId } },
      numberFilter: (search) => ({ game: { id: gameId }, id: search }),
      textFilter: (search) => [
        { game: { id: gameId }, text: ILike(`%${search}%`) },
        { game: { id: gameId }, answer: ILike(`%${search}%`) },
      ],
    });

    const [cards, total] = await this.cardRepository.findAndCount({
      where,
      skip,
      take,
    });

    return {
      total,
      limit,
      page,
      items: cards.map((card) => ({
        id: card.id,
        text: card.text,
        answer: card.answer,
      })),
    };
  }

  async remove(id: number, userId: number) {
    const card = await this.getCard(id, ['game', 'game.createdBy']);

    if (!card.canEdit(userId)) {
      throw new UnauthorizedException();
    }

    if (card.imageId && card.imageUrl) {
      await this.cloudinaryService.deleteImage(card.imageId);
    }

    await this.cardRepository.delete(id);
  }
}
