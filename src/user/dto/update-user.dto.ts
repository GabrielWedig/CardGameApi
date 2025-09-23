import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'Eai galera...', description: 'Sobre mim' })
  about: string;

  @ApiProperty({ example: 'url.png', description: 'Foto' })
  photo: string;

  @ApiProperty({ example: 'eagleflying', description: 'Nome único' })
  name: string;

  @ApiProperty({ example: 'Senha10@', description: 'Senha' })
  password: string;

  @ApiProperty({ example: 'Eagle Flying 99', description: 'Nome de exibição' })
  displayName: string;
}
