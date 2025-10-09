import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
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

  async getUser(id: number, authId: number, relations?: string[]) {
    if (id !== authId) {
      throw new UnauthorizedException(
        'Você não possui permissão para alterar este usuário.',
      );
    }

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
    };
    const user = await this.userRepository.save(newUser);
    const payload = { sub: user.id, name: user.name };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async update(id: number, authId: number, data: UpdateUserDto) {
    const user = await this.getUser(id, authId);

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

  async profile(userName: string, authId: number) {
    const user = await this.userRepository.findOne({
      where: { name: userName },
      relations: ['nationality'],
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const requests = await this.requestRepository.find({
      where: [{ sender: { id: authId } }, { receiver: { id: authId } }],
      relations: ['receiver', 'sender'],
    });

    const userRequest = requests.find(
      (req) => req.sender.id === user.id || req.receiver.id === user.id,
    );

    const isSender = userRequest?.sender.id === authId;
    const isAccepted = !!userRequest?.isAccepted;

    return {
      id: user.id,
      displayName: user.displayName,
      name: user.name,
      photo: user.photo,
      nationalityPhoto: user.nationality.photo,
      about: user.about,
      me: user.id === authId,
      friend: isAccepted,
      requested: !!userRequest && !isAccepted,
      requestedByMe: !!userRequest && isSender && !isAccepted,
      requestId: userRequest?.id,
      canRequest: !userRequest,
      stats: {
        since: user.since.getFullYear(),
      },
    };
  }

  filter(params: FilterPaginationDto) {
    const page = params.page ?? 1;
    const limit = params.limit ?? 50;
    const skip = (page - 1) * limit;
    const search = params.search?.trim();

    const isSearchingByName = search && isNaN(Number(search));
    const searchId = !isSearchingByName ? Number(search) : null;
    const where: FindOptionsWhere<User> | FindOptionsWhere<User>[] = [];

    if (isSearchingByName) {
      where.push({ name: ILike(`%${search}%`) });
      where.push({ displayName: ILike(`%${search}%`) });
    } else if (searchId) {
      where.push({ id: searchId });
    }

    return {
      page,
      limit,
      skip,
      where,
    };
  }

  async find(params: FilterPaginationDto, userId: number) {
    const { where, skip, limit, page } = this.filter(params);

    const mappedWhere = where.map((condition) => ({
      ...condition,
      id: condition.id ? And(Equal(condition.id), Not(userId)) : Not(userId),
    }));
    const defaultWhere = { id: Not(userId) };

    const [users, total] = await this.userRepository.findAndCount({
      where: mappedWhere.length ? mappedWhere : defaultWhere,
      skip,
      take: limit,
      relations: ['nationality'],
    });

    return {
      total,
      limit,
      page,
      items: users.map((user) => ({
        id: user.id,
        displayName: user.displayName,
        name: user.name,
        photo: user.photo,
        nacionalityPhoto: user.nationality.photo,
      })),
    };
  }

  async findFriends(params: FilterPaginationDto, id: number, authId: number) {
    await this.getUser(id, authId);
    const { where, skip, limit, page } = this.filter(params);

    const whereSender = where.map((condition) => ({
      sender: { id },
      receiver: condition,
      isAccepted: true,
    }));

    const whereReceiver = where.map((condition) => ({
      receiver: { id },
      sender: condition,
      isAccepted: true,
    }));

    const mappedWhere = [...whereSender, ...whereReceiver];
    const defaultWhere = [
      { sender: { id }, isAccepted: true },
      { receiver: { id }, isAccepted: true },
    ];

    const [requests, total] = await this.requestRepository.findAndCount({
      where: mappedWhere.length ? mappedWhere : defaultWhere,
      skip,
      take: limit,
      relations: [
        'receiver',
        'receiver.nationality',
        'sender',
        'sender.nationality',
      ],
    });

    return {
      total,
      limit,
      page,
      items: requests.map((req) => {
        const user = req.sender.id === id ? req.receiver : req.sender;
        return {
          id: user.id,
          displayName: user.displayName,
          name: user.name,
          photo: user.photo,
          nacionalityPhoto: user.nationality.photo,
          requestId: req.id,
        };
      }),
    };
  }

  async findRequests(params: FilterPaginationDto, id: number, authId: number) {
    await this.getUser(id, authId);
    const { where, skip, limit, page } = this.filter(params);

    const mappedWhere = where.map((condition) => ({
      receiver: { id },
      sender: condition,
      isAccepted: false,
    }));
    const defaultWhere = { receiver: { id }, isAccepted: false };

    const [requests, total] = await this.requestRepository.findAndCount({
      where: mappedWhere.length ? mappedWhere : defaultWhere,
      skip,
      take: limit,
      relations: ['sender', 'sender.nationality'],
    });

    return {
      total,
      limit,
      page,
      items: requests.map((req) => ({
        id: req.sender.id,
        displayName: req.sender.displayName,
        name: req.sender.name,
        photo: req.sender.photo,
        nacionalityPhoto: req.sender.nationality.photo,
        requestId: req.id,
      })),
    };
  }

  async remove(id: number, authId: number) {
    await this.getUser(id, authId);
    await this.userRepository.delete(id);
  }
}
