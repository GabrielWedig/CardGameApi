import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Req,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtProtected } from 'src/auth/jwt-protected.decorator';
import { AuthenticatedRequest } from 'src/auth/types/auth.types';

@ApiTags('Usuários')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  create(@Body() game: CreateUserDto) {
    return this.userService.create(game);
  }

  @Put(':id')
  @JwtProtected()
  @ApiOperation({ summary: 'Alterar um usuário' })
  update(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.userService.update(+id, data, req.user.id);
  }

  @Get('validate-name')
  @ApiOperation({ summary: 'Valida se o nome está disponível.' })
  async validateName(@Query('name') name: string) {
    const nameExists = await this.userService.nameExists(name);
    return { isValid: !nameExists };
  }

  @Get(':id/profile')
  @ApiOperation({ summary: 'Buscar um usuário pelo ID' })
  findOne(@Param('id') id: string) {
    return this.userService.profile(+id);
  }

  @Delete(':id')
  @JwtProtected()
  @ApiOperation({ summary: 'Deletar um usuário pelo ID' })
  remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.userService.remove(+id, req.user.id);
  }
}
