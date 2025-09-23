import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Nationality } from 'src/nationality/nationality.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Nationality)
    private nationalityRepository: Repository<Nationality>,
  ) {}

  async create(data: CreateUserDto) {
    const nationality = await this.nationalityRepository.findOneBy({
      id: data.nationalityId,
    });

    if (!nationality) {
      throw new NotFoundException('Nacionalidade não encontrada');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const defaultPhoto = 'defaultPhoto';

    const newUser = {
      name: data.name,
      password: hashedPassword,
      displayName: data.displayName,
      photo: defaultPhoto,
      nationality: nationality,
      since: new Date(),
      level: 0,
    };
    await this.userRepository.save(newUser);
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (data.name) {
      const exists = await this.userRepository.exists({
        where: { name: data.name },
      });

      if (exists) {
        throw new BadRequestException('Já existe alguém com esse nome');
      }
      user.name = data.name;
    }

    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);
      user.password = hashedPassword;
    }

    // if (data.photo) {

    // }
    // normais
    user.displayName = data.displayName ?? user.displayName;

    await this.userRepository.update(id, data);
  }

  findAll() {
    return this.userRepository.find({ relations: ['cards'] });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['cards'],
    });

    if (!user) {
      throw new NotFoundException('Jogo não encontrado');
    }

    return user;
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('Jogo não encontrado');
    }

    await this.userRepository.delete(id);
  }
}
