import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGameDto {
  @ApiProperty({ example: 'Américas', description: 'Nome do Jogo' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(['public', 'private', 'friends'])
  @IsNotEmpty()
  visibility: 'public' | 'private' | 'friends';
}
