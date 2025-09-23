import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'eagleflying', description: 'Nome único' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Senha10@', description: 'Senha' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'Eagle Flying 99', description: 'Nome de exibição' })
  @IsNotEmpty()
  displayName: string;

  @ApiProperty({ example: 1, description: 'Nacionalidade' })
  @IsNotEmpty()
  nationalityId: number;
}
