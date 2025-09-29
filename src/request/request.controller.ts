import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Req,
  Get,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { RequestService } from './request.service';
import { JwtProtected } from 'src/auth/jwt-protected.decorator';
import { AuthenticatedRequest } from 'src/auth/types/auth.types';
import { CreateRequestDto } from './dto/create-request.dto';

@ApiTags('Solicitações de Amizade')
@Controller('requests')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post()
  @JwtProtected()
  @ApiOperation({ summary: 'Criar uma nova solicitação' })
  create(@Body() data: CreateRequestDto, @Req() req: AuthenticatedRequest) {
    return this.requestService.create(data, req.user.id);
  }

  @Put(':id/accept')
  @JwtProtected()
  @ApiOperation({ summary: 'Aceitar uma solicitação' })
  accept(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.requestService.accept(+id, req.user.id);
  }

  @Delete(':id/reject')
  @JwtProtected()
  @ApiOperation({ summary: 'Rejeitar uma solicitação' })
  reject(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.requestService.reject(+id, req.user.id);
  }

  @Get()
  @JwtProtected()
  @ApiOperation({ summary: 'Retorna solicitações vinculadas ao usuário' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'search', required: false })
  find(
    @Req() req: AuthenticatedRequest,
    @Query('isAccepted') isAccepted: boolean,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    return this.requestService.find(
      { isAccepted, page, limit, search },
      req.user.id,
    );
  }
}
