import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'eagleflying', description: 'Nome único' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z0-9]{1,15}$/, {
    message:
      'O nome deve conter apenas letras e números, sem espaços ou caracteres especiais, e ter no máximo 15 caracteres',
  })
  name: string;

  @ApiProperty({ example: 'Senha10@', description: 'Senha' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,}$/, {
    message:
      'Senha deve ter no mínimo 8 caracteres, pelo menos uma letra maiúscula, um número e um caractere especial',
  })
  password: string;

  @ApiProperty({ example: 'Eagle Flying 99', description: 'Nome de exibição' })
  @IsString()
  @IsNotEmpty()
  displayName: string;

  @ApiProperty({ example: 1, description: 'Nacionalidade' })
  @IsNumber()
  @IsNotEmpty()
  nationalityId: number;
}
