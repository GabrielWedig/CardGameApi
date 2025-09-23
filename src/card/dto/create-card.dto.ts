import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty({ example: 'Brasil', description: 'Resposta' })
  @IsNotEmpty()
  answer: string;

  @ApiProperty({ example: 'www.minio.com', description: 'Url da imagem' })
  @IsNotEmpty()
  imagePath: string;
}
