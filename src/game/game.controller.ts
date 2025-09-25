import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateGameDto } from './dto/create-game.dto';
import { GameService } from './game.service';
import { UpdateGameDto } from './dto/update-game.dto';
import { JwtProtected } from 'src/auth/jwt-protected.decorator';
import { AuthenticatedRequest } from 'src/auth/types/auth.types';

@ApiTags('Jogos')
@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  @JwtProtected()
  @ApiOperation({ summary: 'Criar um novo jogo' })
  create(@Body() game: CreateGameDto, @Req() req: AuthenticatedRequest) {
    return this.gameService.create(game, req.user.id);
  }

  @Put(':id')
  @JwtProtected()
  @ApiOperation({ summary: 'Alterar um jogo' })
  update(
    @Param('id') id: string,
    @Body() data: UpdateGameDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.gameService.update(+id, data, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os jogos' })
  findAll() {
    return this.gameService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um jogo pelo ID' })
  findOne(@Param('id') id: string) {
    return this.gameService.findOne(+id);
  }

  @Delete(':id')
  @JwtProtected()
  @ApiOperation({ summary: 'Deletar um jogo pelo ID' })
  remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.gameService.remove(+id, req.user.id);
  }
}
