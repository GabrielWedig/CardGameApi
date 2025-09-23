import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nationality } from './nationality.entity';

@Injectable()
export class NationalityService {
  constructor(
    @InjectRepository(Nationality)
    private nationalityRepository: Repository<Nationality>,
  ) {}

  findAll() {
    return this.nationalityRepository.find();
  }
}
