import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async getUser(where: FindOptionsWhere<User>) {
    const user = await this.userRepository.findOne({ where });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  async login(data: LoginDto) {
    const user = await this.getUser({ name: data.name });

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return {
      accessToken: this.jwtService.sign({ sub: user.id, name: user.name }),
    };
  }

  async me(id: number) {
    const user = await this.getUser({ id });
    const { displayName, name, photo } = user;

    return {
      id,
      displayName,
      name,
      photo,
    };
  }
}
