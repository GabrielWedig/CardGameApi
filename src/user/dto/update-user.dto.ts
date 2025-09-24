import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Matches } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'Eai galera...', description: 'Sobre mim' })
  @IsOptional()
  @IsString()
  about?: string;

  @ApiPropertyOptional({ example: 'url.png', description: 'Foto' })
  @IsOptional()
  @IsString()
  photo?: string;

  @ApiPropertyOptional({ example: 'eagleflying', description: 'Nome único' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'Senha10@', description: 'Senha' })
  @IsOptional()
  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,}$/, {
    message:
      'Senha deve ter no mínimo 8 caracteres, pelo menos uma letra maiúscula, um número e um caractere especial',
  })
  password?: string;

  @ApiPropertyOptional({
    example: 'Eagle Flying 99',
    description: 'Nome de exibição',
  })
  @IsOptional()
  @IsString()
  displayName?: string;
}
