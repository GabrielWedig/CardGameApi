import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

interface JwtPayload {
  sub: number;
  name: string;
}

export interface AuthenticatedUser {
  id: number;
  name: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET as string,
    };
    super(options);
  }

  validate(payload: JwtPayload) {
    return {
      id: payload.sub,
      name: payload.name,
    };
  }
}
