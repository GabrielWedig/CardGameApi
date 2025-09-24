import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Fazer login' })
  async login(@Body() data: LoginDto) {
    const user = await this.authService.validateUser(data.name, data.password);
    return this.authService.login(user);
  }
}
