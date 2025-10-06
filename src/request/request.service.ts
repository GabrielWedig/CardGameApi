import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { CreateRequestDto } from './dto/create-request.dto';
import { Request } from './request.entity';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Request)
    private requestRepository: Repository<Request>,
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

  async getRequest(id: number, userId: number) {
    const request = await this.requestRepository.findOne({
      where: { id },
      relations: ['receiver', 'sender'],
    });

    if (!request) {
      throw new NotFoundException('Solicitação não encontrada');
    }
    if (!request.canAnswer(userId)) {
      throw new BadRequestException('Você não pode responder essa solicitação');
    }
    return request;
  }

  async create(data: CreateRequestDto, userId: number) {
    if (userId === data.receiverId) {
      throw new BadRequestException('Você não pode adicionar a si mesmo.');
    }

    const sender = await this.getUser(userId);
    const receiver = await this.getUser(data.receiverId);

    const exists = await this.requestRepository.exists({
      where: [
        {
          sender: { id: sender.id },
          receiver: { id: receiver.id },
        },
        {
          sender: { id: receiver.id },
          receiver: { id: sender.id },
        },
      ],
    });

    if (exists) {
      throw new BadRequestException('Já existe uma solicitação.');
    }

    await this.requestRepository.save({
      sender,
      receiver,
    });
  }

  async accept(id: number, userId: number) {
    const request = await this.getRequest(id, userId);

    if (!request.canAccept(userId)) {
      throw new BadRequestException('Você não pode responder essa solicitação');
    }

    request.isAccepted = true;
    await this.requestRepository.update(id, request);
  }

  async reject(id: number, userId: number) {
    const request = await this.getRequest(id, userId);
    await this.requestRepository.remove(request);
  }
}
