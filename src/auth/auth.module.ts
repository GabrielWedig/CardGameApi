import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';

const jwtOptions: JwtModuleOptions = {
  secret: process.env.JWT_SECRET as string,
  signOptions: { expiresIn: '1d' },
};

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register(jwtOptions)],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
