import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty({ example: 'Brasil', description: 'Resposta' })
  @IsString()
  @IsNotEmpty()
  answer: string;

  @ApiProperty({ example: 'www.minio.com', description: 'Url da imagem' })
  @IsString()
  @IsNotEmpty()
  imagePath: string;

  @ApiProperty({ example: 1, description: 'ID do jogo' })
  @IsNumber()
  @IsNotEmpty()
  gameId: number;
}
