import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'eagleflying', description: 'Nome único' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Senha10@', description: 'Senha' })
  @IsString()
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
