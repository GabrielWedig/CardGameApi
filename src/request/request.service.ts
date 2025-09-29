import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { CreateRequestDto } from './dto/create-request.dto';
import { Request } from './request.entity';
import { FindRequestDto } from './dto/find-request.dto';

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
      relations: ['receiver'],
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

  async find(params: FindRequestDto, userId: number) {
    await this.getUser(userId);

    const page = params.page ?? 1;
    const limit = params.limit ?? 50;
    const skip = (page - 1) * limit;

    let where: FindOptionsWhere<Request>[] | FindOptionsWhere<Request> = {
      receiver: { id: userId },
      isAccepted: false,
    };

    if (params.isAccepted) {
      where = [
        { sender: { id: userId }, isAccepted: true },
        { receiver: { id: userId }, isAccepted: true },
      ];
    }

    const requests = await this.requestRepository.find({
      where,
      skip,
      take: limit,
      relations: [
        'receiver',
        'receiver.nationality',
        'sender',
        'sender.nationality',
      ],
    });

    let users: (User & { requestId: number })[] = requests.map((request) => ({
      requestId: request.id,
      ...request.sender,
    }));

    if (params.isAccepted) {
      users = requests.map((request) => ({
        requestId: request.id,
        ...(request.sender.id !== userId ? request.sender : request.receiver),
      }));
    }
    return {
      page,
      limit,
      total: users.length,
      items: users.map((user) => ({
        requestId: user.requestId,
        id: user.id,
        displayName: user.displayName,
        name: user.name,
        level: user.level,
        photo: user.photo,
        nacionalityPhoto: user.nationality.photo,
      })),
    };
  }
}
