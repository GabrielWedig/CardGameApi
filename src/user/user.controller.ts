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
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
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

  @Put('update')
  @JwtProtected()
  @ApiOperation({ summary: 'Alterar usuário logado' })
  update(@Body() data: UpdateUserDto, @Req() req: AuthenticatedRequest) {
    return this.userService.update(req.user.id, data);
  }

  @Get('validate-name')
  @ApiOperation({ summary: 'Valida se o nome está disponível.' })
  async validateName(@Query('name') name: string) {
    const nameExists = await this.userService.nameExists(name);
    return { isValid: !nameExists };
  }

  @Get(':id/profile')
  @ApiOperation({ summary: 'Retorna perfil do usuário por ID' })
  profile(@Param('id') id: number, @Req() req: AuthenticatedRequest) {
    return this.userService.profile(req.user.id);
  }

  @Get()
  @ApiOperation({
    summary: 'Buscar todos usuários',
  })
  @JwtProtected()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'search', required: false })
  find(
    @Req() req: AuthenticatedRequest,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    return this.userService.find({ search, page, limit }, req.user.id);
  }

  @Delete('remove')
  @JwtProtected()
  @ApiOperation({ summary: 'Deletar usuário logado' })
  remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.userService.remove(req.user.id);
  }
}
