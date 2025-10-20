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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { CardService } from './card.service';
import { CreateCardDto, CreateCardSwaggerDto } from './dto/create-card.dto';
import { UpdateCardDto, UpdateCardSwaggerDto } from './dto/update-card.dto';
import { JwtProtected } from 'src/auth/jwt-protected.decorator';
import { AuthenticatedRequest } from 'src/auth/types/auth.types';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Cards')
@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  @JwtProtected()
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Criar um novo card' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateCardSwaggerDto })
  create(
    @Body() card: CreateCardDto,
    @Req() req: AuthenticatedRequest,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.cardService.create(card, req.user.id, image);
  }

  @Put(':id')
  @JwtProtected()
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Alterar um card' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateCardSwaggerDto })
  update(
    @Param('id') id: string,
    @Body() data: UpdateCardDto,
    @Req() req: AuthenticatedRequest,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.cardService.update(+id, data, req.user.id, image);
  }

  @Get('play')
  @ApiOperation({ summary: 'Retona cards do jogo misturados' })
  play(@Query('gameId') gameId: number) {
    return this.cardService.play(gameId);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiOperation({ summary: 'Listar cards pelo ID do jogo' })
  findByGame(
    @Query('gameId') gameId: number,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    return this.cardService.findByGame(gameId, { search, page, limit });
  }

  @Delete(':id')
  @JwtProtected()
  @ApiOperation({ summary: 'Deletar um card pelo ID' })
  remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.cardService.remove(+id, req.user.id);
  }
}
