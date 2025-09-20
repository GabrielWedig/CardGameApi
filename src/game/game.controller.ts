import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateGameDto } from './dto/create-game.dto';
import { GameService } from './game.service';
import { UpdateGameDto } from './dto/update-game.dto';

@ApiTags('Jogos')
@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo jogo' })
  create(@Body() game: CreateGameDto) {
    return this.gameService.create(game);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Alterar um jogo' })
  update(@Param('id') id: string, @Body() data: UpdateGameDto) {
    return this.gameService.update(+id, data);
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
  @ApiOperation({ summary: 'Deletar um jogo pelo ID' })
  remove(@Param('id') id: string) {
    return this.gameService.remove(+id);
  }
}
