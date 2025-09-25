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
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { JwtProtected } from 'src/auth/jwt-protected.decorator';
import { AuthenticatedUser } from 'src/auth/jwt.strategy';

@ApiTags('Cards')
@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  @JwtProtected()
  @ApiOperation({ summary: 'Criar um novo card' })
  create(
    @Body() card: CreateCardDto,
    @Req() req: Request & { user: AuthenticatedUser },
  ) {
    return this.cardService.create(card, req.user.id);
  }

  @Put(':id')
  @JwtProtected()
  @ApiOperation({ summary: 'Alterar um card' })
  update(
    @Param('id') id: string,
    @Body() data: UpdateCardDto,
    @Req() req: Request & { user: AuthenticatedUser },
  ) {
    return this.cardService.update(+id, data, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar cards pelo ID do jogo' })
  findByGame(@Query('gameId') gameId: number) {
    return this.cardService.findByGame(gameId);
  }

  @Delete(':id')
  @JwtProtected()
  @ApiOperation({ summary: 'Deletar um card pelo ID' })
  remove(
    @Param('id') id: string,
    @Req() req: Request & { user: AuthenticatedUser },
  ) {
    return this.cardService.remove(+id, req.user.id);
  }
}
