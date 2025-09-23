import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { NationalityService } from './nationality.service';

@ApiTags('Nacionalidades')
@Controller('nationalities')
export class NationalityController {
  constructor(private readonly nationalityService: NationalityService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as nacionalidades' })
  findAll() {
    return this.nationalityService.findAll();
  }
}
