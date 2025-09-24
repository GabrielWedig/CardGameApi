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
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { JwtProtected } from 'src/auth/jwt-protected.decorator';

@ApiTags('Cards')
@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  @JwtProtected()
  @ApiOperation({ summary: 'Criar um novo card' })
  create(@Body() card: CreateCardDto) {
    return this.cardService.create(card);
  }

  @Put(':id')
  @JwtProtected()
  @ApiOperation({ summary: 'Alterar um card' })
  update(@Param('id') id: string, @Body() data: UpdateCardDto) {
    return this.cardService.update(+id, data);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os cards' })
  findAll() {
    return this.cardService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um card pelo ID' })
  findOne(@Param('id') id: string) {
    return this.cardService.findOne(+id);
  }

  @Delete(':id')
  @JwtProtected()
  @ApiOperation({ summary: 'Deletar um card pelo ID' })
  remove(@Param('id') id: string) {
    return this.cardService.remove(+id);
  }
}
