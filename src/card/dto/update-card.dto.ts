import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCardDto {
  @ApiProperty({ example: 'Brasil', description: 'Resposta' })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  answer?: string;

  @ApiProperty({ example: 'www.minio.com', description: 'Url da imagem' })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  imageUrl?: string;

  @ApiProperty({ example: 'www.minio.com', description: 'Id da imagem' })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  imageId?: string;
}
