import { Module } from '@nestjs/common';
import { NationalityService } from './nationality.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nationality } from './nationality.entity';
import { NationalityController } from './nationality.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Nationality])],
  controllers: [NationalityController],
  providers: [NationalityService],
})
export class NationalityModule {}
