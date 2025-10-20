import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { And, Equal, ILike, Not, Repository } from 'typeorm';
import { User } from './user.entity';
import { Nationality } from 'src/nationality/nationality.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { FilterPaginationDto } from 'src/common/dto/pagination.dto';
import { Request } from 'src/request/request.entity';
import { CloudinaryService } from 'src/common/services/cloudinary.service';
import { buildFilter, paginated } from 'src/common/buildFilter';

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
    const photoUrl =
      'https://res.cloudinary.com/dqwif7teu/image/upload/v1760150794/users/tfeebnhxk9bkjhpgb6xh.png';
    const photoId = 'tfeebnhxk9bkjhpgb6xh';

    const newUser = {
      name: name,
      password: hashedPassword,
      displayName: data.displayName,
      nationality: nationality,
      since: new Date(),
      photoUrl,
      photoId,
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

    if (data.name && data.name !== user.name) {
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
      nationalityImageUrl: user.nationality.imageUrl,
      about: user.about,
      me,
      friend: !me && isAccepted,
      requested: !!userRequest && !isSender && !isAccepted,
      requestedByMe: !!userRequest && isSender && !isAccepted,
      requestId: userRequest?.id,
      canRequest: !me && !userRequest,
      stats: {
        since: user.since.getFullYear(),
      },
    };
  }

  async find(params: FilterPaginationDto, userId: number) {
    const { skip, take, limit, page } = paginated(params);

    const where = buildFilter<User>({
      search: params.search,
      defaultWhere: { id: Not(userId) },
      numberFilter: (search) => ({ id: And(Not(userId), Equal(search)) }),
      textFilter: (search) => [
        { id: Not(userId), name: ILike(`%${search}%`) },
        { id: Not(userId), displayName: ILike(`%${search}%`) },
      ],
    });

    const [users, total] = await this.userRepository.findAndCount({
      relations: ['nationality'],
      where,
      skip,
      take,
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
        nationalityImageUrl: user.nationality.imageUrl,
      })),
    };
  }

  async findFriends(params: FilterPaginationDto, id: number, authId: number) {
    await this.getUser(id, authId);
    const { skip, take, limit, page } = paginated(params);

    const userFilter = buildFilter<User>({
      search: params.search,
      numberFilter: (search) => ({ id: search }),
      textFilter: (search) => [
        { name: ILike(`%${search}%`) },
        { displayName: ILike(`%${search}%`) },
      ],
    });

    const where = [
      { sender: { id }, isAccepted: true, receiver: userFilter },
      { receiver: { id }, isAccepted: true, sender: userFilter },
    ];

    const [requests, total] = await this.requestRepository.findAndCount({
      relations: [
        'receiver',
        'receiver.nationality',
        'sender',
        'sender.nationality',
      ],
      where,
      skip,
      take,
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
          nationalityImageUrl: user.nationality.imageUrl,
          requestId: req.id,
        };
      }),
    };
  }

  async findRequests(params: FilterPaginationDto, id: number, authId: number) {
    await this.getUser(id, authId);
    const { skip, take, limit, page } = paginated(params);

    const userFilter = buildFilter<User>({
      search: params.search,
      numberFilter: (search) => ({ id: search }),
      textFilter: (search) => [
        { name: ILike(`%${search}%`) },
        { displayName: ILike(`%${search}%`) },
      ],
    });

    const where = { receiver: { id }, isAccepted: false, sender: userFilter };

    const [requests, total] = await this.requestRepository.findAndCount({
      relations: ['sender', 'sender.nationality'],
      where,
      skip,
      take,
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
        nationalityImageUrl: req.sender.nationality.imageUrl,
        requestId: req.id,
      })),
    };
  }

  async remove(id: number, authId: number) {
    const user = await this.getUser(id, authId);

    if (user.photoId && user.photoUrl) {
      await this.cloudinaryService.deleteImage(user.photoId);
    }

    await this.userRepository.delete(id);
  }
}
