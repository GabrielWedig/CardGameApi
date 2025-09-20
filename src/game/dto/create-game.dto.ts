import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGameDto {
  @ApiProperty({ example: 'Américas', description: 'Nome do Jogo' })
  @IsNotEmpty()
  name: string;
}
