import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthenticatedRequest } from './types/auth.types';
import { JwtProtected } from './jwt-protected.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Fazer login' })
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

  @Get('me')
  @JwtProtected()
  @ApiOperation({ summary: 'Retorna dados básicos do usuário' })
  me(@Req() req: AuthenticatedRequest) {
    return this.authService.me(req.user.id);
  }
}
