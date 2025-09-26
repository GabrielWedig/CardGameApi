import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Nationality } from 'src/nationality/nationality.entity';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';

const jwtOptions: JwtModuleOptions = {
  secret: process.env.JWT_SECRET as string,
  signOptions: { expiresIn: '1d' },
};

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Nationality]),
    JwtModule.register(jwtOptions),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
