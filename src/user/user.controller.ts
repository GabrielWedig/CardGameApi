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

  @Get('validate-name')
  @ApiOperation({ summary: 'Valida se o nome está disponível.' })
  async validateName(@Query('name') name: string) {
    const nameExists = await this.userService.nameExists(name);
    return { isValid: !nameExists };
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

  @Put(':id/update')
  @JwtProtected()
  @ApiOperation({ summary: 'Alterar usuário logado' })
  update(
    @Param('id') id: number,
    @Body() data: UpdateUserDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.userService.update(id, req.user.id, data);
  }

  @Get(':id/profile')
  @JwtProtected()
  @ApiOperation({ summary: 'Retorna perfil do usuário por ID' })
  profile(@Param('id') id: number, @Req() req: AuthenticatedRequest) {
    return this.userService.profile(id, req.user.id);
  }

  @Get(':id/friends')
  @ApiOperation({
    summary: 'Buscar amigos',
  })
  @JwtProtected()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'search', required: false })
  findFriends(
    @Param('id') id: number,
    @Req() req: AuthenticatedRequest,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    return this.userService.findFriends(
      { search, page, limit },
      id,
      req.user.id,
    );
  }

  @Get(':id/requests')
  @ApiOperation({
    summary: 'Buscar solicitações de amizade',
  })
  @JwtProtected()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'search', required: false })
  findRequests(
    @Param('id') id: number,
    @Req() req: AuthenticatedRequest,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    return this.userService.findRequests(
      { search, page, limit },
      id,
      req.user.id,
    );
  }

  @Delete(':id/remove')
  @JwtProtected()
  @ApiOperation({ summary: 'Deletar usuário logado' })
  remove(@Param('id') id: number, @Req() req: AuthenticatedRequest) {
    return this.userService.remove(id, req.user.id);
  }
}
