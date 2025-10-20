import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateCardDto {
  @ApiProperty({ example: 'Brasil', description: 'Resposta' })
  @IsString()
  @IsNotEmpty()
  answer: string;

  @ApiProperty({ example: 1, description: 'ID do jogo' })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  gameId: number;

  @ApiProperty({
    example: 'Pergunta',
    description: 'Qual é o maior país do mundo?',
  })
  @IsString()
  @IsOptional()
  text?: string;
}

export class CreateCardSwaggerDto extends OmitType(CreateCardDto, [
  'text',
] as const) {
  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: 'Imagem',
  })
  image?: Express.Multer.File;

  @ApiPropertyOptional({
    type: 'string',
    description: 'Pergunta',
  })
  text?: string;
}
