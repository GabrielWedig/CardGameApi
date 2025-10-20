import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCardDto {
  @ApiProperty({ example: 'Brasil', description: 'Resposta' })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  answer?: string;

  @ApiProperty({
    example: 'Pergunta',
    description: 'Qual é o maior país do mundo?',
  })
  @IsString()
  @IsOptional()
  text?: string;
}

export class UpdateCardSwaggerDto extends OmitType(UpdateCardDto, [
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
