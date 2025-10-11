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
import { CloudinaryService } from 'src/common/services/cloudinary.service';

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
    private cloudinaryService: CloudinaryService,
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

  async nameExists(name: string, authName?: string) {
    if (authName && authName === name) {
      return true;
    }
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

    const newUser = {
      name: name,
      password: hashedPassword,
      displayName: data.displayName,
      nationality: nationality,
      since: new Date(),
    };
    const user = await this.userRepository.save(newUser);
    const payload = { sub: user.id, name: user.name };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async update(
    id: number,
    authId: number,
    data: UpdateUserDto,
    photo?: Express.Multer.File,
  ) {
    const user = await this.getUser(id, authId);

    if (data.name) {
      user.name = await this.validateName(data.name);
    }

    if (data.password) {
      user.password = await this.hashPassword(data.password);
    }

    if (photo) {
      if (user.photoId && user.photoUrl) {
        await this.cloudinaryService.deleteImage(user.photoId);
      }
      const response = await this.cloudinaryService.uploadImage(
        photo.buffer,
        'users',
      );
      user.photoUrl = response.url;
      user.photoId = response.publicId;
    }

    user.displayName = data.displayName ? data.displayName : user.displayName;
    user.about = data.about ? data.about : user.about;

    await this.userRepository.update(id, user);
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

    const me = user.id === authId;

    const userRequest = !me
      ? requests.find(
          (req) => req.sender.id === user.id || req.receiver.id === user.id,
        )
      : null;

    const isSender = userRequest?.sender.id === authId;
    const isAccepted = !!userRequest?.isAccepted;

    return {
      id: user.id,
      displayName: user.displayName,
      name: user.name,
      photoUrl: user.photoUrl,
      nationalityPhotoUrl: user.nationality.photoUrl,
      about: user.about,
      me,
      friend: !me && isAccepted,
      requested: !!userRequest && !isAccepted,
      requestedByMe: !!userRequest && isSender && !isAccepted,
      requestId: userRequest?.id,
      canRequest: !me && !userRequest,
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
        photoUrl: user.photoUrl,
        nationalityPhotoUrl: user.nationality.photoUrl,
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
          photoUrl: user.photoUrl,
          nationalityPhotoUrl: user.nationality.photoUrl,
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
        photoUrl: req.sender.photoUrl,
        nationalityPhotoUrl: req.sender.nationality.photoUrl,
        requestId: req.id,
      })),
    };
  }

  async remove(id: number, authId: number) {
    await this.getUser(id, authId);
    await this.userRepository.delete(id);
  }
}
