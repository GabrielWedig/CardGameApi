import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { And, Equal, FindOptionsWhere, ILike, Not, Repository } from 'typeorm';
import { User } from './user.entity';
import { Nationality } from 'src/nationality/nationality.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { FilterPaginationDto } from 'src/common/dto/pagination.dto';
import { Request } from 'src/request/request.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Nationality)
    private nationalityRepository: Repository<Nationality>,
    @InjectRepository(Request)
    private requestRepository: Repository<Request>,
    private jwtService: JwtService,
  ) {}

  async getNationality(id: number) {
    const nationality = await this.nationalityRepository.findOneBy({
      id,
    });
    if (!nationality) {
      throw new NotFoundException('Nacionalidade não encontrada');
    }
    return nationality;
  }

  async getUser(id: number, relations?: string[]) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations,
    });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  async nameExists(name: string) {
    return await this.userRepository.exists({
      where: { name },
    });
  }

  async validateName(name: string) {
    const nameExists = await this.nameExists(name);
    if (nameExists) {
      throw new BadRequestException('Já existe um usuário com esse nome');
    }
    return name;
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async create(data: CreateUserDto) {
    const name = await this.validateName(data.name);
    const nationality = await this.getNationality(data.nationalityId);
    const hashedPassword = await this.hashPassword(data.password);

    const defaultPhoto =
      'https://res.cloudinary.com/dqwif7teu/image/upload/v1758653165/users/vgvgxqncbaro2upu6lmw.png';

    const newUser = {
      name: name,
      password: hashedPassword,
      displayName: data.displayName,
      photo: defaultPhoto,
      nationality: nationality,
      since: new Date(),
      level: 0,
    };
    const user = await this.userRepository.save(newUser);
    const payload = { sub: user.id, name: user.name };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.getUser(id);

    if (data.name) {
      user.name = await this.validateName(data.name);
    }

    if (data.password) {
      user.password = await this.hashPassword(data.password);
    }

    user.displayName = data.displayName ?? user.displayName;
    user.photo = data.photo ?? user.photo;
    user.about = data.about ?? user.about;

    await this.userRepository.update(id, data);
  }

  async profile(id: number) {
    const user = await this.getUser(id, ['nationality', 'games', 'friends']);

    return {
      id: user.id,
      name: user.name,
      displayName: user.displayName,
      photo: user.photo,
      nationality: {
        name: user.nationality.name,
        photo: user.nationality.photo,
      },
      about: user.about,
      since: user.since,
      level: user.level,
      games: user.games.length,
    };
  }

  async find(params: FilterPaginationDto, userId: number) {
    await this.getUser(userId);

    const requests = await this.requestRepository.find({
      where: [{ sender: { id: userId } }, { receiver: { id: userId } }],
      relations: ['receiver', 'sender'],
    });

    const page = params.page ?? 1;
    const limit = params.limit ?? 50;
    const skip = (page - 1) * limit;

    const searchId = isNaN(Number(params.search));
    let where: FindOptionsWhere<User>[] | FindOptionsWhere<User> = {
      id: Not(userId),
    };

    if (params.search && !searchId) {
      where = { id: And(Not(userId), Equal(Number(params.search))) };
    }
    if (params.search && searchId) {
      where = [
        { id: Not(userId), name: ILike(`%${params.search.trim()}%`) },
        { id: Not(userId), displayName: ILike(`%${params.search.trim()}%`) },
      ];
    }

    const [users, total] = await this.userRepository.findAndCount({
      where,
      skip,
      take: limit,
      relations: ['nationality', 'receivedRequests', 'receivedRequests.sender'],
    });

    return {
      total,
      limit,
      page,
      items: users.map((user) => {
        const request = requests.find(
          (request) =>
            request.sender.id === user.id || request.receiver.id === user.id,
        );
        return {
          id: user.id,
          displayName: user.displayName,
          name: user.name,
          level: user.level,
          photo: user.photo,
          nacionalityPhoto: user.nationality.photo,
          requestId: request?.id,
          isFriend: request?.isAccepted,
        };
      }),
    };
  }

  async remove(id: number) {
    await this.getUser(id);
    await this.userRepository.delete(id);
  }
}
