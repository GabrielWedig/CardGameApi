import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRequestDto {
  @ApiProperty({ example: 1, description: 'ID do usuário que vai receber' })
  @IsNumber()
  receiverId: number;
}
