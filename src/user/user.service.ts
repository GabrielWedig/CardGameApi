import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Nationality } from 'src/nationality/nationality.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Nationality)
    private nationalityRepository: Repository<Nationality>,
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

  async validateName(name: string) {
    const exists = await this.userRepository.exists({
      where: { name },
    });
    if (exists) {
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

  async update(id: number, data: UpdateUserDto, userId: number) {
    const user = await this.getUser(id);

    if (!user.canEdit(userId)) {
      throw new UnauthorizedException();
    }

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

  async findOne(id: number) {
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
      friends: user.friends.length,
      games: user.games.length,
    };
  }

  async remove(id: number, userId: number) {
    const user = await this.getUser(id);

    if (!user.canEdit(userId)) {
      throw new UnauthorizedException();
    }

    await this.userRepository.delete(id);
  }
}
