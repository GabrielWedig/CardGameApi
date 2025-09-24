/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */

import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';

const jwtOptions: JwtModuleOptions = {
  secret: process.env.JWT_SECRET || 'defaultSecret',
  signOptions: { expiresIn: '1d' },
};

@Module({
  imports: [UserModule, PassportModule, JwtModule.register(jwtOptions)],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
