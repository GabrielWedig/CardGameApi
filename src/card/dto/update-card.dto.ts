import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCardDto {
  @ApiProperty({ example: 'Brasil', description: 'Resposta' })
  @IsString()
  @IsNotEmpty()
  answer: string;

  @ApiProperty({ example: 'www.minio.com', description: 'Url da imagem' })
  @IsString()
  @IsNotEmpty()
  imagePath: string;
}
